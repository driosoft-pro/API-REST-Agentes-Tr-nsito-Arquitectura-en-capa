export default function Alert({ type = "info", children }) {
  const styles = {
    info: "border-sky-900/50 bg-sky-950/40 text-sky-100",
    success: "border-emerald-900/50 bg-emerald-950/40 text-emerald-100",
    error: "border-rose-900/50 bg-rose-950/40 text-rose-100",
  };
  return (
    <div className={"border rounded-2xl p-3 text-sm " + (styles[type] || styles.info)}>
      {children}
    </div>
  );
}
