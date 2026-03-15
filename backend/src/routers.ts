import { router, publicProcedure, adminProcedure, protectedProcedure } from "./trpc";
import { z } from "zod";
import { Booking } from "./models/Booking";
import { Contact } from "./models/Contact";
import { Newsletter } from "./models/Newsletter";
import { User } from "./models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const appRouter = router({
    auth: router({
        login: publicProcedure
            .input(z.object({ email: z.string(), password: z.string() }))
            .mutation(async ({ input }) => {
                const email = input.email.toLowerCase().trim();
                let user = await User.findOne({ email });

                try {
                    console.log(`Login attempt for: ${email}`);
                    if (email === "admin@zamgo.com") {
                        console.log("Admin email detected");
                        if (input.password.trim() !== "Nasriin0855") {
                            console.log("Admin password mismatch");
                            return { success: false, message: "Invalid credentials" };
                        }
                        if (!user) {
                            console.log("Creating new admin user");
                            const hashed = await bcrypt.hash(input.password, 10);
                            user = new User({ name: "Admin", email, password: hashed, role: "admin" });
                            await user.save();
                        } else {
                            console.log("Updating existing admin user credentials/role");
                            const valid = await bcrypt.compare(input.password, user.password!);
                            if (!valid) {
                                user.password = await bcrypt.hash(input.password, 10);
                            }
                            user.role = "admin";
                            await user.save();
                        }
                    } else {
                        if (!user) {
                            console.log("User not found");
                            return { success: false, message: "Invalid credentials (Account not found)" };
                        }
                        const valid = await bcrypt.compare(input.password, user.password!);
                        if (!valid) {
                            console.log("Password mismatch");
                            return { success: false, message: "Invalid credentials" };
                        }
                    }

                    console.log(`Login successful for ${user.email}, role: ${user.role}`);
                    const token = email === "admin@zamgo.com" 
                        ? jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET || 'secret')
                        : jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
                    
                    return { success: true, token, role: user.role };
                } catch (error) {
                    console.error("Internal login error:", error);
                    return { 
                        success: false, 
                        message: "An internal server error occurred. Please check server logs." 
                    };
                }
            }),
        me: protectedProcedure.query(async ({ ctx }) => {
            return {
                id: ctx.user._id,
                name: ctx.user.name,
                email: ctx.user.email,
                role: ctx.user.role
            };
        }),
    }),

    bookings: router({
        create: publicProcedure
            .input((val: any) => val)
            .mutation(async ({ input }) => {
                try {
                    const newBooking = new Booking(input);
                    await newBooking.save();
                    return { success: true, message: "Booking request submitted successfully!" };
                } catch (error) {
                    console.error("Booking creation error:", error);
                    return { success: false, message: "Failed to create booking" };
                }
            }),
        getAllBookings: adminProcedure.query(async () => {
            return await Booking.find().populate('userId').sort({ createdAt: -1 });
        }),
        updateBookingStatus: adminProcedure
            .input(z.object({ id: z.string(), status: z.enum(['pending', 'confirmed', 'cancelled']) }))
            .mutation(async ({ input }) => {
                const booking = await Booking.findByIdAndUpdate(input.id, { status: input.status }, { new: true });
                return { success: true, booking };
            }),
    }),

    contact: router({
        submit: publicProcedure
            .input((val: any) => val)
            .mutation(async ({ input }) => {
                try {
                    const newContact = new Contact(input);
                    await newContact.save();
                    return { success: true, message: "Thank you for contacting us! We will respond soon." };
                } catch (error) {
                    console.error("Contact submission error:", error);
                    return { success: false, message: "Failed to submit contact form" };
                }
            }),
        list: publicProcedure.query(async () => {
            return await Contact.find().sort({ createdAt: -1 });
        }),
    }),

    newsletter: router({
        subscribe: publicProcedure
            .input((val: any) => val)
            .mutation(async ({ input }) => {
                try {
                    const newSubscription = new Newsletter({ email: input.email });
                    await newSubscription.save();
                    return { success: true, message: "Successfully subscribed to our newsletter!" };
                } catch (error) {
                    console.error("Newsletter subscription error:", error);
                    return { success: false, message: "Failed to subscribe (might already be subscribed)" };
                }
            }),
    }),
});

export type AppRouter = typeof appRouter;
