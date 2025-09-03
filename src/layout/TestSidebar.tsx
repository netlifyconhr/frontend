import React, { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Settings,
  Users,
  FileText,
  BarChart,
  Bell,
} from "lucide-react";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "#dashboard",
    },
    {
      id: "users",
      label: "User Management",
      icon: Users,
      children: [
        { label: "All Users", href: "#users/all" },
        { label: "User Roles", href: "#users/roles" },
        { label: "Permissions", href: "#users/permissions" },
        { label: "User Analytics", href: "#users/analytics" },
      ],
    },
    {
      id: "content",
      label: "Content",
      icon: FileText,
      children: [
        { label: "Articles", href: "#content/articles" },
        { label: "Media Library", href: "#content/media" },
        {
          label: "Categories",
          href: "#content/categories",
          children: [
            { label: "Main Categories", href: "#content/categories/main" },
            { label: "Subcategories", href: "#content/categories/sub" },
            { label: "Tags", href: "#content/categories/tags" },
          ],
        },
        { label: "SEO Settings", href: "#content/seo" },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart,
      children: [
        { label: "Traffic Overview", href: "#analytics/traffic" },
        { label: "User Behavior", href: "#analytics/behavior" },
        { label: "Conversion Tracking", href: "#analytics/conversion" },
      ],
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      href: "#notifications",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      children: [
        { label: "General", href: "#settings/general" },
        { label: "Security", href: "#settings/security" },
        { label: "Integrations", href: "#settings/integrations" },
        { label: "API Keys", href: "#settings/api" },
      ],
    },
  ];

  const AccordionItem = ({ item, level = 0 }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openAccordions[item.id];
    const Icon = item.icon;

    return (
      <div className={`${level > 0 ? "ml-4" : ""}`}>
        <div
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/10 ${
            level === 0 ? "mb-1" : "mb-0.5"
          }`}
          onClick={() => (hasChildren ? toggleAccordion(item.id) : null)}
        >
          <div className="flex items-center gap-3">
            {Icon && level === 0 && (
              <Icon size={20} className="text-white/80" />
            )}
            <span
              className={`font-medium text-white/90 ${
                level > 0 ? "text-sm" : ""
              }`}
            >
              {item.label}
            </span>
          </div>
          {hasChildren && (
            <ChevronDown
              size={16}
              className={`text-white/60 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>

        {hasChildren && isOpen && (
          <div className="ml-2 space-y-1">
            {item.children.map((child, index) => (
              <AccordionItem
                key={`${item.id}-${index}`}
                item={{ ...child, id: `${item.id}-${index}` }}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 z-40 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900
        shadow-2xl backdrop-blur-sm
      `}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center backdrop-blur-sm">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-white/60 text-sm">Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 h-full overflow-y-auto">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <AccordionItem key={item.id} item={item} />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="p-4 rounded-xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="text-white font-medium">John Doe</p>
                  <p className="text-white/60 text-sm">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area (Demo) */}
      <div className="lg:ml-80 min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Dashboard
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              This is your main content area. The sidebar on the left provides
              navigation to different sections of your application. On mobile
              devices, tap the menu button in the top-left corner to access the
              sidebar.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">Card {i}</h3>
                  <p className="text-gray-600 text-sm">
                    This is a sample card to demonstrate the layout and spacing.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
