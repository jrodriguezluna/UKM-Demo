import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  Download,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Settings,
  Star,
  User,
  X,
} from "lucide-react";

/**
 * Clickable, self-contained demo that mirrors your mockup flow:
 * Login -> Home (Recent Orders) -> Drawer -> Orders list -> Order detail -> Map tracking
 * plus Notifications / Account / Settings.
 *
 * Drop this file into any React + Tailwind project (Vite/Next) and render <App/>.
 */

const BRAND = {
  primary: "bg-[#3E6B2A]", // UKM-ish green
  primaryText: "text-[#3E6B2A]",
  primaryRing: "focus:ring-[#3E6B2A]",
  soft: "bg-[#EAF2E7]",
  soft2: "bg-[#F3F7F1]",
};

function cx(...cls) {
  return cls.filter(Boolean).join(" ");
}

function Pill({ children, tone = "green" }) {
  const styles =
    tone === "green"
      ? "bg-[#3E6B2A] text-white"
      : tone === "gray"
      ? "bg-zinc-200 text-zinc-900"
      : tone === "amber"
      ? "bg-amber-500 text-white"
      : "bg-rose-600 text-white";
  return (
    <span className={cx("px-2 py-1 text-[11px] rounded-full font-medium", styles)}>
      {children}
    </span>
  );
}

function TopBar({
  title,
  onBack,
  onMenu,
  onSearch,
  onBell,
  right,
  left,
}) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-3">
      <div className="flex items-center gap-2 min-w-0">
        {left ?? (
          <button
            onClick={onBack || onMenu}
            className="p-2 rounded-xl hover:bg-zinc-100 active:bg-zinc-200"
            aria-label={onBack ? "Back" : "Menu"}
          >
            {onBack ? <ArrowLeft size={20} /> : <Menu size={20} />}
          </button>
        )}
        <div className="min-w-0">
          <div className="text-[13px] font-semibold tracking-wide text-zinc-900 truncate">
            {title}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onSearch && (
          <button
            onClick={onSearch}
            className="p-2 rounded-xl hover:bg-zinc-100 active:bg-zinc-200"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        )}
        {onBell && (
          <button
            onClick={onBell}
            className="p-2 rounded-xl hover:bg-zinc-100 active:bg-zinc-200"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
        )}
        {right}
      </div>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-100 p-6">
      <div className="relative w-[390px] h-[844px] bg-white rounded-[44px] shadow-2xl overflow-hidden border border-zinc-200">
        {/* notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[160px] h-[32px] bg-zinc-100 rounded-[18px] border border-zinc-200" />
        {/* content */}
        <div className="absolute inset-0 pt-10">{children}</div>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-3xl grid place-items-center border border-zinc-200">
        <div className={cx("w-16 h-16 rounded-2xl grid place-items-center", BRAND.soft)}>
          <Package className={BRAND.primaryText} size={34} />
        </div>
      </div>
      <div className="mt-3 font-extrabold tracking-tight text-zinc-900">
        <span className={BRAND.primaryText}>UKM</span>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-600 mb-1">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cx(
          "w-full px-4 py-3 rounded-2xl border border-zinc-200 outline-none",
          "focus:ring-2",
          BRAND.primaryRing
        )}
      />
    </label>
  );
}

function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "w-full py-3 rounded-2xl font-semibold text-white",
        BRAND.primary,
        "hover:opacity-95 active:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-2xl font-semibold border border-zinc-200 text-zinc-900 hover:bg-zinc-50 active:bg-zinc-100"
    >
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return (
    <div className={cx("rounded-3xl border border-zinc-200 bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-zinc-200" />;
}

function StatusLabel({ status }) {
  if (status === "en_camino") return <Pill tone="amber">En camino</Pill>;
  if (status === "en_bodega") return <Pill tone="gray">En bodega</Pill>;
  if (status === "recibido") return <Pill tone="green">Recibido</Pill>;
  if (status === "devuelto") return <Pill tone="rose">Devuelto</Pill>;
  return <Pill tone="gray">—</Pill>;
}

function ProductThumb({ kind }) {
  // Simple “product image” placeholder
  const icon =
    kind === "laptop" ? "💻" : kind === "earbuds" ? "🎧" : kind === "cap" ? "🧢" : "📦";
  return (
    <div className={cx("w-16 h-16 rounded-2xl grid place-items-center", BRAND.soft2)}>
      <div className="text-2xl">{icon}</div>
    </div>
  );
}

function TabPills({ value, onChange, items }) {
  return (
    <div className="px-4">
      <div className="flex gap-2 p-1 rounded-2xl bg-zinc-100 border border-zinc-200">
        {items.map((it) => (
          <button
            key={it.value}
            onClick={() => onChange(it.value)}
            className={cx(
              "flex-1 py-2 rounded-xl text-xs font-semibold",
              value === it.value ? cx(BRAND.primary, "text-white") : "text-zinc-700"
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="px-4 py-3 rounded-2xl bg-zinc-900 text-white text-sm shadow-lg flex items-center gap-3">
            <span className="max-w-[260px]">{message}</span>
            <button onClick={onClose} className="opacity-80 hover:opacity-100">
              <X size={18} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const initialOrders = [
  {
    id: "RR19703494429BCL",
    name: "Computador HP Intel",
    kind: "laptop",
    status: "en_camino",
    eta: "17/11/2025",
    created: "29/10/2025",
    shipped: "14/11/2025",
    recipient: "Juan Pinto",
    address: "La cisterna Av. Marte",
    phone: "+56 9 59898207",
  },
  {
    id: "RR19703494429BC2",
    name: "Redmi buds 6 pro",
    kind: "earbuds",
    status: "en_bodega",
    eta: "22/11/2025",
    created: "29/10/2025",
    shipped: "—",
    recipient: "Juan Pinto",
    address: "Las Condes · Martín de Zamora 1234",
    phone: "+56 9 1234 5678",
  },
  {
    id: "RR19703494429BC3",
    name: "Headwear Varsity",
    kind: "cap",
    status: "recibido",
    eta: "—",
    created: "29/10/2025",
    shipped: "14/11/2025",
    delivered: "14/11/2025",
    recipient: "Juan Pinto",
    address: "Las Condes · Martín de Zamora 1234",
    phone: "+56 9 1234 5678",
  },
];

const initialNotifications = [
  {
    id: "n1",
    from: "UKM",
    time: "10:30 AM",
    text: "Tu pedido está siendo procesado.",
  },
  {
    id: "n2",
    from: "John Doe",
    time: "07:53 PM",
    text: "Tu pedido está cerca.",
  },
];

function Drawer({ open, onClose, onNav, userEmail }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 z-30"
            aria-label="Close drawer"
          />
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="absolute top-0 left-0 bottom-0 w-[320px] bg-white z-40 border-r border-zinc-200"
          >
            <div className="px-4 pt-6 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cx("w-12 h-12 rounded-2xl grid place-items-center", BRAND.soft)}>
                  <User className={BRAND.primaryText} />
                </div>
                <div>
                  <div className="text-sm font-semibold">Usuario</div>
                  <div className="text-xs text-zinc-500">{userEmail}</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-zinc-100 active:bg-zinc-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-2">
              <DrawerItem icon={<Package size={18} />} label="Inicio" onClick={() => onNav("home")} />
              <DrawerItem
                icon={<Package size={18} />}
                label="Ver mis pedidos"
                onClick={() => onNav("orders")}
              />
              <DrawerItem
                icon={<User size={18} />}
                label="Cuenta"
                onClick={() => onNav("account")}
              />
              <DrawerItem
                icon={<Bell size={18} />}
                label="Notificaciones"
                onClick={() => onNav("notifications")}
              />
              <DrawerItem
                icon={<Settings size={18} />}
                label="Configuración"
                onClick={() => onNav("settings")}
              />
              <DrawerItem
                icon={<LogOut size={18} />}
                label="Cerrar sesión"
                danger
                onClick={() => onNav("logout")}
              />
            </div>

            <div className="absolute bottom-4 left-0 right-0 px-4 text-xs text-zinc-400">
              Demo interactiva • UI editable
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function DrawerItem({ icon, label, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full flex items-center justify-between px-3 py-3 rounded-2xl hover:bg-zinc-50 active:bg-zinc-100",
        danger && "text-rose-700"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cx("w-9 h-9 rounded-2xl grid place-items-center", BRAND.soft2)}>
          {icon}
        </div>
        <div className="text-sm font-semibold">{label}</div>
      </div>
      <ChevronRight size={18} className="opacity-60" />
    </button>
  );
}

function OrderRow({ order, onDetail, onMap, onConfirm, onReturn, onReview }) {
  return (
    <Card className="p-3">
      <div className="flex gap-3">
        <ProductThumb kind={order.kind} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-sm font-semibold text-zinc-900 truncate">{order.name}</div>
              <div className="text-[11px] text-zinc-500">
                {order.status === "recibido"
                  ? `Se entregó el día ${order.delivered || "—"}`
                  : `Será entregado el día: ${order.eta}`}
              </div>
            </div>
            <StatusLabel status={order.status} />
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={onDetail}
              className={cx(
                "px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-200",
                "hover:bg-zinc-50 active:bg-zinc-100"
              )}
            >
              Detalle
            </button>

            <button
              onClick={onMap}
              className={cx(
                "px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-200",
                "hover:bg-zinc-50 active:bg-zinc-100"
              )}
            >
              Mapa
            </button>

            {order.status !== "recibido" && order.status !== "devuelto" ? (
              <button
                onClick={onConfirm}
                className={cx("px-3 py-2 rounded-xl text-xs font-semibold text-white", BRAND.primary)}
              >
                Confirmar entrega
              </button>
            ) : null}

            {order.status === "recibido" ? (
              <>
                <button
                  onClick={onReturn}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-600 text-white"
                >
                  Devolución
                </button>
                <button
                  onClick={onReview}
                  className={cx(
                    "px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-200",
                    "hover:bg-zinc-50 active:bg-zinc-100"
                  )}
                >
                  Dejar una reseña
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

function LoginScreen({ onLogin, setToast }) {
  const [user, setUser] = useState("user");
  const [pass, setPass] = useState("password");

  return (
    <div className="h-full flex flex-col px-6">
      <div className="flex-1 flex flex-col justify-center">
        <LogoMark />
        <div className="mt-10 space-y-4">
          <InputField label="Ingrese su usuario:" value={user} onChange={setUser} placeholder="User" />
          <InputField
            label="Contraseña"
            value={pass}
            onChange={setPass}
            placeholder="Password"
            type="password"
          />
          <PrimaryButton
            onClick={() => {
              if (!user.trim() || !pass.trim()) {
                setToast("Completa usuario y contraseña.");
                return;
              }
              onLogin({ user, email: `${user}@xxxxxx.com` });
            }}
          >
            INICIAR SESIÓN
          </PrimaryButton>
          <div className="text-center text-xs text-zinc-500">
            ¿Olvidaste tu contraseña?
            <button
              className={cx("ml-1 font-semibold", BRAND.primaryText)}
              onClick={() => setToast("Demo: recuperación de contraseña")}
            >
              Recuperar
            </button>
          </div>
          <GhostButton onClick={() => setToast("Demo: registro")}>REGISTRARSE</GhostButton>

          <div className="pt-2">
            <div className="text-center text-xs text-zinc-500 mb-2">Iniciar sesión con</div>
            <div className="flex gap-3 justify-center">
              <button
                className="w-12 h-12 rounded-2xl border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100"
                onClick={() => setToast("Demo: Google login")}
                aria-label="Google"
              >
                <span className="text-lg">G</span>
              </button>
              <button
                className="w-12 h-12 rounded-2xl border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100"
                onClick={() => setToast("Demo: Facebook login")}
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-6 text-center text-[11px] text-zinc-400">UI demo • sin backend</div>
    </div>
  );
}

function HomeScreen({ orders, onOpenDrawer, onOpenBell, onOpenOrders, onPickOrder }) {
  const recent = useMemo(() => orders.slice(0, 3), [orders]);

  return (
    <div className="h-full flex flex-col">
      <TopBar title="" onMenu={onOpenDrawer} onBell={onOpenBell} />

      <div className="px-4">
        <div
          className={cx(
            "rounded-3xl border border-zinc-200 overflow-hidden",
            "shadow-sm"
          )}
        >
          <div className={cx("px-4 py-3", BRAND.primary)}>
            <div className="text-white font-semibold">Pedidos Recientes</div>
          </div>
          <div className="p-4 space-y-3">
            {recent.map((o) => (
              <button
                key={o.id}
                onClick={() => onPickOrder(o.id)}
                className="w-full text-left"
              >
                <div className={cx("p-3 rounded-2xl", BRAND.soft2, "border border-zinc-200")}
                >
                  <div className="flex items-center gap-3">
                    <ProductThumb kind={o.kind} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{o.name}</div>
                      <div className="text-[11px] text-zinc-500">
                        {o.status === "recibido"
                          ? `Se entregó el día ${o.delivered || "—"}`
                          : `Será entregado el día ${o.eta}`}
                      </div>
                    </div>
                    <div>
                      <span className="px-3 py-2 rounded-xl text-xs font-semibold border border-zinc-200 bg-white">
                        Mapa
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}

            <button
              onClick={onOpenOrders}
              className={cx(
                "w-full py-3 rounded-2xl font-semibold text-white",
                BRAND.primary
              )}
            >
              Ver mis pedidos
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <Card className="p-4">
          <div className="text-sm font-semibold">Tip</div>
          <div className="text-xs text-zinc-600 mt-1">
            Este demo está hecho para que puedas cambiar pantallas, estados (confirmar entrega / devolución) y
            mostrar el flujo a stakeholders.
          </div>
        </Card>
      </div>

      <div className="flex-1" />

      <div className="px-4 pb-5">
        <div className="text-[11px] text-zinc-400">Menú ☰ → Cuenta / Notificaciones / Configuración</div>
      </div>
    </div>
  );
}

function OrdersScreen({ orders, onBack, onPick, onMap, onMutate, setToast }) {
  const [tab, setTab] = useState("todos");
  const filtered = useMemo(() => {
    if (tab === "enviado") return orders.filter((o) => o.status === "en_camino");
    if (tab === "en_bodega") return orders.filter((o) => o.status === "en_bodega");
    if (tab === "dev") return orders.filter((o) => o.status === "devuelto");
    return orders;
  }, [orders, tab]);

  return (
    <div className="h-full flex flex-col">
      <TopBar title="TUS PEDIDOS" onBack={onBack} onSearch={() => setToast("Demo: búsqueda")}/>

      <TabPills
        value={tab}
        onChange={setTab}
        items={[
          { value: "todos", label: "Todos" },
          { value: "enviado", label: "Enviado" },
          { value: "en_bodega", label: "En bodega" },
          { value: "dev", label: "Devoluciones" },
        ]}
      />

      <div className="px-4 mt-4 space-y-3 overflow-auto pb-6">
        {filtered.map((o) => (
          <OrderRow
            key={o.id}
            order={o}
            onDetail={() => onPick(o.id)}
            onMap={() => onMap(o.id)}
            onConfirm={() => {
              onMutate(o.id, (cur) => ({
                ...cur,
                status: "recibido",
                delivered: new Date().toLocaleDateString("es-CL"),
              }));
              setToast("Entrega confirmada (demo)");
            }}
            onReturn={() => {
              onMutate(o.id, (cur) => ({ ...cur, status: "devuelto" }));
              setToast("Solicitud de devolución creada (demo)");
            }}
            onReview={() => setToast("Demo: reseña")}
          />
        ))}

        {filtered.length === 0 ? (
          <div className="text-center text-sm text-zinc-500 py-10">No hay pedidos en esta pestaña.</div>
        ) : null}
      </div>
    </div>
  );
}

function OrderDetailsScreen({ order, onBack, setToast }) {
  return (
    <div className="h-full flex flex-col">
      <TopBar title="DETALLES DE PEDIDO" onBack={onBack} />

      <div className="px-4">
        <Card className="p-4">
          <div className="flex gap-3">
            <ProductThumb kind={order.kind} />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold">{order.name}</div>
                <div className="flex items-center gap-2">
                  <StatusLabel status={order.status} />
                  {order.status === "recibido" ? (
                    <CheckCircle2 className={BRAND.primaryText} size={20} />
                  ) : null}
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                {order.status === "recibido" ? `Entregado ${order.delivered || "—"}` : `Entrega estimada ${order.eta}`}
              </div>
            </div>
          </div>

          <Divider />

          <div className="mt-3 text-[12px] text-zinc-600">
            Orden completa. Si el artículo que recibiste es defectuoso o no es como se describe, puedes abrir una disputa.
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <DetailRow label="N° de pedido" value={order.id} />
            <DetailRow label="Pedido efectuado en" value={order.created} />
            <DetailRow label="Envío completado en" value={order.shipped || "—"} />
            <DetailRow label="Nombre receptor" value={order.recipient} />
            <DetailRow label="Dirección" value={order.address} />
            <DetailRow label="Número" value={order.phone} />
            <DetailRow label="Firma" value={<span className="font-medium">✓</span>} />
          </div>

          <button
            onClick={() => setToast("Demo: descargar foto de entrega")}
            className={cx(
              "mt-4 w-full flex items-center justify-between px-4 py-3 rounded-2xl",
              BRAND.soft2,
              "border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100"
            )}
          >
            <span className={cx("text-sm font-semibold", BRAND.primaryText)}>
              Descargar foto de la entrega
            </span>
            <Download size={18} />
          </button>
        </Card>

        <div className="mt-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Reseña rápida</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={cx(i < 4 ? "text-amber-500" : "text-zinc-300")} />
                ))}
              </div>
            </div>
            <button
              onClick={() => setToast("Demo: abrir reseña")}
              className={cx(
                "mt-3 w-full py-3 rounded-2xl font-semibold border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100"
              )}
            >
              Dejar una reseña
            </button>
          </Card>
        </div>
      </div>

      <div className="flex-1" />
      <div className="px-4 pb-6 text-[11px] text-zinc-400">
        Consejo: conecta esto a tu API real reemplazando los mocks (orders) por fetch.
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="text-zinc-500 text-[12px]">{label}</div>
      <div className="text-zinc-900 text-[12px] font-semibold text-right break-all">{value}</div>
    </div>
  );
}

function MapScreen({ order, onBack, setToast }) {
  return (
    <div className="h-full flex flex-col">
      <TopBar title="" onBack={onBack} />

      <div className="px-4">
        <Card className="overflow-hidden">
          {/* Fake map */}
          <div className="h-[420px] bg-zinc-100 relative">
            <div className="absolute inset-0 opacity-60" style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }} />

            {/* route */}
            <svg className="absolute inset-0" viewBox="0 0 390 420" preserveAspectRatio="none">
              <path
                d="M 40 320 C 120 280, 160 120, 240 150 S 340 260, 360 80"
                fill="none"
                stroke="rgba(62,107,42,0.9)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <circle cx="40" cy="320" r="10" fill="rgba(62,107,42,1)" />
              <circle cx="360" cy="80" r="10" fill="rgba(62,107,42,1)" />
            </svg>

            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className={cx("px-3 py-2 rounded-2xl text-xs font-semibold text-white", BRAND.primary)}>
                Pedido: {order?.eta ? "en ruta" : "—"}
              </div>
              <button
                onClick={() => setToast("Demo: re-centrar mapa")}
                className="px-3 py-2 rounded-2xl text-xs font-semibold bg-white border border-zinc-200"
              >
                Re-centrar
              </button>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <Card className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-zinc-500">Pedido en ruta al tuyo</div>
                    <div className="text-sm font-semibold">{order?.name}</div>
                  </div>
                  <StatusLabel status={order?.status} />
                </div>

                <Divider />

                <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                  <Info label="Detalle de la entrega" value={order?.eta ? `Llega aprox. hoy` : "—"} />
                  <Info label="Nombre despachador" value="John Doe" />
                  <Info label="Modelo de vehículo" value="Sprinter" />
                  <Info label="Patente" value="AB CD 01" />
                  <Info label="Dirección de entrega" value={order?.address || "—"} />
                  <Info
                    label="Rating"
                    value={
                      <span className="inline-flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} className={cx(i < 4 ? "text-amber-500" : "text-zinc-300")} />
                        ))}
                      </span>
                    }
                  />
                </div>

                <button
                  onClick={() => setToast("Demo: llamar despachador")}
                  className={cx(
                    "mt-4 w-full py-3 rounded-2xl font-semibold text-white flex items-center justify-center gap-2",
                    BRAND.primary
                  )}
                >
                  <MapPin size={18} /> Seguir en tiempo real
                </button>
              </Card>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex-1" />
      <div className="px-4 pb-6 text-[11px] text-zinc-400">
        Nota: para un mapa real, reemplaza este bloque por Google Maps / Mapbox / Leaflet.
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="min-w-0">
      <div className="text-zinc-500 text-[11px]">{label}</div>
      <div className="text-zinc-900 font-semibold truncate">{value}</div>
    </div>
  );
}

function NotificationsScreen({ notifications, onBack }) {
  return (
    <div className="h-full flex flex-col">
      <TopBar title="NOTIFICACIONES" onBack={onBack} />
      <div className="px-4 mt-2 space-y-3 overflow-auto pb-6">
        {notifications.map((n) => (
          <Card key={n.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cx("w-10 h-10 rounded-2xl grid place-items-center", BRAND.soft)}>
                  <User className={BRAND.primaryText} size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold">{n.from}</div>
                  <div className="text-xs text-zinc-500">{n.time}</div>
                </div>
              </div>
            </div>
            <div className="text-sm text-zinc-700 mt-3">{n.text}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AccountScreen({ onBack, user, setToast }) {
  return (
    <div className="h-full flex flex-col">
      <TopBar title="MI CUENTA" onBack={onBack} />
      <div className="px-4">
        <Card className="overflow-hidden">
          <div className={cx("p-4", BRAND.primary)}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 grid place-items-center">
                <User className="text-white" size={24} />
              </div>
              <div>
                <div className="text-white font-semibold">{user?.user || "Usuario"}</div>
                <div className="text-white/80 text-xs">{user?.email || "user@xxxxxx.com"}</div>
              </div>
              <div className="flex-1" />
              <button
                onClick={() => setToast("Demo: editar información")}
                className="px-3 py-2 rounded-xl bg-white/15 text-white text-xs font-semibold border border-white/20"
              >
                Editar información
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <AccountRow label="Nombre" value="Juan Pinto" />
            <AccountRow label="Número tel" value="(+56) 9 1234 5678" />
            <AccountRow label="Correo" value={user?.email || "user@xxxxxx.com"} />
            <AccountRow label="Dirección" value="Martín de Zamora 1234" />
            <AccountRow label="Comuna" value="Las Condes" />
            <AccountRow label="Pref. Horaria" value="Diurno" />
          </div>
        </Card>
      </div>

      <div className="flex-1" />
      <div className="px-4 pb-6 text-[11px] text-zinc-400">En una versión real, esto vendría desde tu perfil.</div>
    </div>
  );
}

function AccountRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-xs font-semibold text-zinc-900 text-right">{value}</div>
    </div>
  );
}

function SettingsScreen({ onBack, setToast }) {
  const [fontSize, setFontSize] = useState("M");
  const [theme, setTheme] = useState("Claro");
  const [contrast, setContrast] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <TopBar title="CONFIGURACIÓN" onBack={onBack} />
      <div className="px-4">
        <Card className="p-4 space-y-3">
          <SettingRow
            label="Tamaño de la letra"
            right={
              <select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className={cx(
                  "px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold",
                  "focus:ring-2",
                  BRAND.primaryRing
                )}
              >
                <option>S</option>
                <option>M</option>
                <option>L</option>
              </select>
            }
          />
          <SettingRow
            label="Color de la aplicación"
            right={
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={cx(
                  "px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold",
                  "focus:ring-2",
                  BRAND.primaryRing
                )}
              >
                <option>Claro</option>
                <option>Oscuro</option>
                <option>System</option>
              </select>
            }
          />
          <SettingRow
            label="Alto Contraste"
            right={
              <button
                onClick={() => setContrast((v) => !v)}
                className={cx(
                  "px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold",
                  contrast ? cx(BRAND.primary, "text-white") : "bg-white"
                )}
              >
                {contrast ? "Encendido" : "Apagado"}
              </button>
            }
          />

          <button
            onClick={() => setToast(`Demo: guardado (Letra ${fontSize}, Tema ${theme}, Contraste ${contrast ? "ON" : "OFF"})`)}
            className={cx("w-full py-3 rounded-2xl font-semibold text-white", BRAND.primary)}
          >
            Guardar
          </button>
        </Card>
      </div>

      <div className="flex-1" />
      <div className="px-4 pb-6 text-[11px] text-zinc-400">
        Ajustes solo para demo (no persisten).
      </div>
    </div>
  );
}

function SettingRow({ label, right }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-sm font-semibold text-zinc-900">{label}</div>
      {right}
    </div>
  );
}

export default function App() {
  const [toast, setToast] = useState("");
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [orders, setOrders] = useState(initialOrders);
  const [notifications] = useState(initialNotifications);

  const [screen, setScreen] = useState("login");
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrders[0].id);

  const selectedOrder = useMemo(
    () => orders.find((o) => o.id === selectedOrderId) || orders[0],
    [orders, selectedOrderId]
  );

  function nav(next) {
    setDrawerOpen(false);
    if (next === "logout") {
      setUser(null);
      setScreen("login");
      setToast("Sesión cerrada (demo)");
      return;
    }
    setScreen(next);
  }

  function mutateOrder(id, fn) {
    setOrders((prev) => prev.map((o) => (o.id === id ? fn(o) : o)));
  }

  return (
    <PhoneFrame>
      <Toast message={toast} onClose={() => setToast("")} />

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNav={nav}
        userEmail={user?.email || "user@xxxxxx.com"}
      />

      <div className={cx("h-full", drawerOpen && "pointer-events-none blur-[1px]")}
      >
        <AnimatePresence mode="wait">
          {screen === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <LoginScreen
                setToast={(m) => setToast(m)}
                onLogin={(u) => {
                  setUser(u);
                  setScreen("home");
                  setToast("Bienvenido (demo)");
                }}
              />
            </motion.div>
          ) : null}

          {screen === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <HomeScreen
                orders={orders}
                onOpenDrawer={() => setDrawerOpen(true)}
                onOpenBell={() => setScreen("notifications")}
                onOpenOrders={() => setScreen("orders")}
                onPickOrder={(id) => {
                  setSelectedOrderId(id);
                  setScreen("map");
                }}
              />
            </motion.div>
          ) : null}

          {screen === "orders" ? (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <OrdersScreen
                orders={orders}
                onBack={() => setScreen("home")}
                onPick={(id) => {
                  setSelectedOrderId(id);
                  setScreen("orderDetails");
                }}
                onMap={(id) => {
                  setSelectedOrderId(id);
                  setScreen("map");
                }}
                onMutate={mutateOrder}
                setToast={setToast}
              />
            </motion.div>
          ) : null}

          {screen === "orderDetails" ? (
            <motion.div
              key="orderDetails"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <OrderDetailsScreen order={selectedOrder} onBack={() => setScreen("orders")} setToast={setToast} />
            </motion.div>
          ) : null}

          {screen === "map" ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <MapScreen order={selectedOrder} onBack={() => setScreen("orders")} setToast={setToast} />
            </motion.div>
          ) : null}

          {screen === "notifications" ? (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <NotificationsScreen notifications={notifications} onBack={() => setScreen("home")} />
            </motion.div>
          ) : null}

          {screen === "account" ? (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <AccountScreen user={user} onBack={() => setScreen("home")} setToast={setToast} />
            </motion.div>
          ) : null}

          {screen === "settings" ? (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="h-full"
            >
              <SettingsScreen onBack={() => setScreen("home")} setToast={setToast} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}

