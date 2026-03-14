import { useState } from 'react';
import { User, Bell, Plug, CreditCard, Save, ChevronRight } from 'lucide-react';

const SECTIONS = [
  { id: 'profile',       label: 'Profile',        icon: User },
  { id: 'notifications', label: 'Notifications',  icon: Bell },
  { id: 'integrations',  label: 'Integrations',   icon: Plug },
  { id: 'billing',       label: 'Billing',         icon: CreditCard },
];

const InputField = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
    />
  </div>
);

const Toggle = ({ label, description, checked, onChange }) => (
  <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 mt-0.5 ${checked ? 'bg-indigo-600' : 'bg-gray-200'}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  </div>
);

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const [profile, setProfile] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@plumberai.com',
    phone: '+1 (555) 123-4567',
    company: 'PlumberAI Inc.',
    role: 'Property Manager',
  });
  const setP = (k) => (e) => setProfile((p) => ({ ...p, [k]: e.target.value }));

  const [notifications, setNotifications] = useState({
    emailInspections: true,
    emailWorkOrders: true,
    emailAlerts: true,
    smsEmergency: false,
    weeklyReport: true,
    monthlyDigest: false,
  });
  const toggleN = (k) => (v) => setNotifications((n) => ({ ...n, [k]: v }));

  const [saved, setSaved] = useState(false);
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-100 p-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Settings</p>
        <nav className="space-y-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${activeSection === id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {label}
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl space-y-6">
          {/* ── Profile ── */}
          {activeSection === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-400 mt-0.5">Update your personal details</p>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                  {profile.firstName[0]}{profile.lastName[0]}
                </div>
                <div>
                  <button className="text-sm text-indigo-600 font-medium hover:text-indigo-800">Change avatar</button>
                  <p className="text-xs text-gray-400 mt-0.5">JPG, PNG up to 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" value={profile.firstName} onChange={setP('firstName')} />
                <InputField label="Last Name"  value={profile.lastName}  onChange={setP('lastName')} />
              </div>
              <InputField label="Email"   value={profile.email}   onChange={setP('email')}   type="email" />
              <InputField label="Phone"   value={profile.phone}   onChange={setP('phone')}   type="tel" />
              <InputField label="Company" value={profile.company} onChange={setP('company')} />
              <InputField label="Role"    value={profile.role}    onChange={setP('role')} />

              <div className="flex justify-end pt-2">
                <button onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  <Save className="w-4 h-4" />
                  {saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Notification Preferences</h2>
                <p className="text-sm text-gray-400 mt-0.5">Choose how and when you receive alerts</p>
              </div>

              <div className="space-y-0">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Email Notifications</p>
                <Toggle label="Inspection Reports" description="Receive email when an inspection is completed" checked={notifications.emailInspections} onChange={toggleN('emailInspections')} />
                <Toggle label="Work Order Updates"  description="Notified when work orders change status" checked={notifications.emailWorkOrders}   onChange={toggleN('emailWorkOrders')} />
                <Toggle label="Critical Alerts"     description="Immediate email for critical fixture failures" checked={notifications.emailAlerts}       onChange={toggleN('emailAlerts')} />
              </div>

              <div className="space-y-0 pt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">SMS Notifications</p>
                <Toggle label="Emergency Alerts" description="SMS for Emergency priority work orders only" checked={notifications.smsEmergency} onChange={toggleN('smsEmergency')} />
              </div>

              <div className="space-y-0 pt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Reports</p>
                <Toggle label="Weekly Summary"  description="Portfolio summary every Monday morning" checked={notifications.weeklyReport}  onChange={toggleN('weeklyReport')} />
                <Toggle label="Monthly Digest"  description="Detailed monthly analytics report" checked={notifications.monthlyDigest} onChange={toggleN('monthlyDigest')} />
              </div>

              <div className="flex justify-end">
                <button onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-green-600 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                  <Save className="w-4 h-4" />
                  {saved ? 'Saved!' : 'Save Preferences'}
                </button>
              </div>
            </div>
          )}

          {/* ── Integrations ── */}
          {activeSection === 'integrations' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Integrations</h2>
                <p className="text-sm text-gray-400 mt-0.5">Connect PlumberAI to your existing tools</p>
              </div>
              {[
                { name: 'Slack',         desc: 'Send work order and alert notifications to Slack channels', connected: true },
                { name: 'QuickBooks',    desc: 'Sync invoices and billing with QuickBooks Online', connected: false },
                { name: 'Google Calendar', desc: 'Sync inspection schedules to Google Calendar', connected: true },
                { name: 'Zapier',        desc: 'Connect to 5,000+ apps via Zapier automation', connected: false },
                { name: 'Docusign',      desc: 'Send inspection reports for digital signature', connected: false },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{integration.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{integration.desc}</p>
                  </div>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                    ${integration.connected
                      ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                    {integration.connected ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Billing ── */}
          {activeSection === 'billing' && (
            <div className="space-y-4">
              {/* Current Plan */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Current Plan</h2>
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-5 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-lg font-bold">Professional</p>
                      <p className="text-indigo-200 text-sm">Up to 20 properties, unlimited inspections</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">$149</p>
                      <p className="text-indigo-200 text-xs">/month</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-indigo-500 grid grid-cols-3 gap-3 text-center">
                    <div><p className="text-lg font-bold">6</p><p className="text-xs text-indigo-200">Properties</p></div>
                    <div><p className="text-lg font-bold">∞</p><p className="text-xs text-indigo-200">Inspections</p></div>
                    <div><p className="text-lg font-bold">3</p><p className="text-xs text-indigo-200">Users</p></div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-400">Next billing date: January 1, 2025 · Auto-renew enabled</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Visa ending in 4242</p>
                      <p className="text-xs text-gray-400">Expires 12/2026</p>
                    </div>
                  </div>
                  <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800">Update</button>
                </div>
              </div>

              {/* Invoice History */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Invoice History</h2>
                <div className="space-y-2">
                  {[
                    { date: 'Dec 1, 2024', amount: '$149.00', status: 'Paid' },
                    { date: 'Nov 1, 2024', amount: '$149.00', status: 'Paid' },
                    { date: 'Oct 1, 2024', amount: '$149.00', status: 'Paid' },
                  ].map((inv) => (
                    <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{inv.date}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700">{inv.amount}</span>
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{inv.status}</span>
                        <button className="text-xs text-indigo-600 hover:text-indigo-800">Download</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
