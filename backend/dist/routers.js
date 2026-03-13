"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
const Booking_1 = require("./models/Booking");
const Contact_1 = require("./models/Contact");
const Newsletter_1 = require("./models/Newsletter");
const User_1 = require("./models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.appRouter = (0, trpc_1.router)({
    auth: (0, trpc_1.router)({
        login: trpc_1.publicProcedure
            .input(zod_1.z.object({ email: zod_1.z.string(), password: zod_1.z.string() }))
            .mutation(async ({ input }) => {
            let user = await User_1.User.findOne({ email: input.email });
            if (!user) {
                if (input.email === "admin@zamgo.com") {
                    const hashed = await bcryptjs_1.default.hash(input.password, 10);
                    user = new User_1.User({ name: "Admin", email: input.email, password: hashed, role: "admin" });
                    await user.save();
                }
                else {
                    return { success: false, message: "Invalid credentials" };
                }
            }
            else {
                const valid = await bcryptjs_1.default.compare(input.password, user.password);
                if (!valid) {
                    return { success: false, message: "Invalid credentials" };
                }
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
            return { success: true, token, role: user.role };
        }),
    }),
    bookings: (0, trpc_1.router)({
        create: trpc_1.publicProcedure
            .input((val) => val)
            .mutation(async ({ input }) => {
            try {
                const newBooking = new Booking_1.Booking(input);
                await newBooking.save();
                return { success: true, message: "Booking request submitted successfully!" };
            }
            catch (error) {
                console.error("Booking creation error:", error);
                return { success: false, message: "Failed to create booking" };
            }
        }),
        getAllBookings: trpc_1.adminProcedure.query(async () => {
            return await Booking_1.Booking.find().populate('userId').sort({ createdAt: -1 });
        }),
        updateBookingStatus: trpc_1.adminProcedure
            .input(zod_1.z.object({ id: zod_1.z.string(), status: zod_1.z.enum(['pending', 'confirmed', 'cancelled']) }))
            .mutation(async ({ input }) => {
            const booking = await Booking_1.Booking.findByIdAndUpdate(input.id, { status: input.status }, { new: true });
            return { success: true, booking };
        }),
    }),
    contact: (0, trpc_1.router)({
        submit: trpc_1.publicProcedure
            .input((val) => val)
            .mutation(async ({ input }) => {
            try {
                const newContact = new Contact_1.Contact(input);
                await newContact.save();
                return { success: true, message: "Thank you for contacting us! We will respond soon." };
            }
            catch (error) {
                console.error("Contact submission error:", error);
                return { success: false, message: "Failed to submit contact form" };
            }
        }),
        list: trpc_1.publicProcedure.query(async () => {
            return await Contact_1.Contact.find().sort({ createdAt: -1 });
        }),
    }),
    newsletter: (0, trpc_1.router)({
        subscribe: trpc_1.publicProcedure
            .input((val) => val)
            .mutation(async ({ input }) => {
            try {
                const newSubscription = new Newsletter_1.Newsletter({ email: input.email });
                await newSubscription.save();
                return { success: true, message: "Successfully subscribed to our newsletter!" };
            }
            catch (error) {
                console.error("Newsletter subscription error:", error);
                return { success: false, message: "Failed to subscribe (might already be subscribed)" };
            }
        }),
    }),
});
