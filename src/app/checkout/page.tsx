import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ background: "#0a0a0f" }}>
      <h1 className="text-2xl font-display text-gold mb-4">结算页</h1>
      <p className="text-sm mb-6" style={{ color: "rgba(212,196,160,0.6)" }}>
        请从付费页面选择商品后进入
      </p>
      <button
        onClick={() => router.push("/pay")}
        className="px-6 py-2.5 rounded-xl text-sm font-medium"
        style={{
          background: "linear-gradient(135deg, #c9a05edd, #c9a05e88)",
          color: "#fff",
        }}
      >
        返回付费页
      </button>
    </div>
  );
}
