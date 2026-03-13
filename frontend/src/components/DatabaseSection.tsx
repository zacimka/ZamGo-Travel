/* ZamGo Travel — Database Structure Section
   Design: Clean developer-friendly schema display */
import { useEffect, useRef, useState } from "react";
import { Database, Table2, Key, Link } from "lucide-react";

type TableField = {
  name: string;
  type: string;
  key?: boolean;
  fk?: string;
  unique?: boolean;
};

const TABLES: { name: string; color: string; headerColor: string; fields: TableField[] }[] = [
  {
    name: "users",
    color: "border-blue-400 bg-blue-50",
    headerColor: "bg-blue-600",
    fields: [
      { name: "id", type: "UUID", key: true },
      { name: "full_name", type: "VARCHAR(100)" },
      { name: "email", type: "VARCHAR(255)", unique: true },
      { name: "phone", type: "VARCHAR(20)" },
      { name: "password_hash", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
  {
    name: "destinations",
    color: "border-orange-400 bg-orange-50",
    headerColor: "bg-orange-500",
    fields: [
      { name: "id", type: "UUID", key: true },
      { name: "name", type: "VARCHAR(100)" },
      { name: "country", type: "VARCHAR(100)" },
      { name: "image_url", type: "TEXT" },
      { name: "description", type: "TEXT" },
      { name: "rating", type: "DECIMAL(3,2)" },
      { name: "is_featured", type: "BOOLEAN" },
    ],
  },
  {
    name: "travel_packages",
    color: "border-emerald-400 bg-emerald-50",
    headerColor: "bg-emerald-600",
    fields: [
      { name: "id", type: "UUID", key: true },
      { name: "destination_id", type: "UUID", fk: "destinations" },
      { name: "title", type: "VARCHAR(200)" },
      { name: "description", type: "TEXT" },
      { name: "duration_days", type: "INT" },
      { name: "price", type: "DECIMAL(10,2)" },
      { name: "max_travelers", type: "INT" },
    ],
  },
  {
    name: "bookings",
    color: "border-purple-400 bg-purple-50",
    headerColor: "bg-purple-600",
    fields: [
      { name: "id", type: "UUID", key: true },
      { name: "user_id", type: "UUID", fk: "users" },
      { name: "package_id", type: "UUID", fk: "travel_packages" },
      { name: "departure_date", type: "DATE" },
      { name: "return_date", type: "DATE" },
      { name: "travelers_count", type: "INT" },
      { name: "status", type: "ENUM" },
      { name: "total_price", type: "DECIMAL(10,2)" },
    ],
  },
  {
    name: "reviews",
    color: "border-pink-400 bg-pink-50",
    headerColor: "bg-pink-600",
    fields: [
      { name: "id", type: "UUID", key: true },
      { name: "user_id", type: "UUID", fk: "users" },
      { name: "booking_id", type: "UUID", fk: "bookings" },
      { name: "destination_id", type: "UUID", fk: "destinations" },
      { name: "rating", type: "INT (1-5)" },
      { name: "comment", type: "TEXT" },
      { name: "created_at", type: "TIMESTAMP" },
    ],
  },
];

export default function DatabaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-0.5 w-10 bg-orange-400" />
            <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest font-body">
              Technical Reference
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-blue-950 leading-tight">
              Database <span className="text-gradient-blue">Schema</span>
            </h2>
            <p className="text-slate-500 max-w-md font-body leading-relaxed">
              Suggested relational database structure for the ZamGo Travel
              platform. Designed for scalability and data integrity.
            </p>
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TABLES.map((table, i) => (
            <div
              key={table.name}
              className={`rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ${table.color} ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Table Header */}
              <div className={`${table.headerColor} px-5 py-3.5 flex items-center gap-2`}>
                <Table2 className="w-4 h-4 text-white" />
                <span className="font-mono text-white font-bold text-sm">{table.name}</span>
                <Database className="w-3.5 h-3.5 text-white/60 ml-auto" />
              </div>

              {/* Fields */}
              <div className="p-4">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200">
                      <th className="text-left pb-2 font-semibold">Column</th>
                      <th className="text-left pb-2 font-semibold">Type</th>
                      <th className="text-right pb-2 font-semibold">Constraint</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.fields.map((field) => (
                      <tr key={field.name} className="border-b border-slate-100 last:border-0">
                        <td className="py-1.5 text-slate-800 font-semibold flex items-center gap-1">
                          {field.key && <Key className="w-3 h-3 text-amber-500" />}
                          {field.fk && <Link className="w-3 h-3 text-blue-500" />}
                          {!field.key && !field.fk && <span className="inline-block w-3" />}
                          {field.name}
                        </td>
                        <td className="py-1.5 text-slate-500">{field.type}</td>
                        <td className="py-1.5 text-right">
                          {field.key && (
                            <span className="bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded text-xs">PK</span>
                          )}
                          {field.fk && (
                            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">FK</span>
                          )}
                          {field.unique && (
                            <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs">UQ</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          className={`mt-8 flex flex-wrap gap-4 justify-center transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.6s" }}
        >
          {[
            { icon: Key, color: "text-amber-500", label: "Primary Key (PK)" },
            { icon: Link, color: "text-blue-500", label: "Foreign Key (FK)" },
          ].map(({ icon: Icon, color, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-slate-600 font-body">
              <Icon className={`w-4 h-4 ${color}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
