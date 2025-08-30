import { useState } from "react";
import { Copy, Check } from "lucide-react";

const credentials = [
  { role: "Super Admin", email: "superadmin@gmail.com", password: "12345678" },
  { role: "Admin", email: "admin@gmail.com", password: "12345678" },
];

export default function DemoCredentials() {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [text]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [text]: false }));
    }, 2000); // reset icon after 2 seconds
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="font-semibold mb-2"> Credentials</h3>
      {credentials.map((cred) => (
        <div key={cred.email} className="mb-4 bg-white p-3 rounded shadow-sm">
          <p className="text-sm font-medium">{cred.role}</p>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Email: {cred.email}</span>
            <button
              onClick={() => handleCopy(cred.email)}
              className="p-1 rounded hover:bg-gray-200 transition"
              title="Copy email"
            >
              {copied[cred.email] ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-gray-500">Password: {cred.password}</span>
            <button
              onClick={() => handleCopy(cred.password)}
              className="p-1 rounded hover:bg-gray-200 transition"
              title="Copy password"
            >
              {copied[cred.password] ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
