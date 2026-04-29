import AppNav from "@/app/components/AppNav";

const challenges = [
  {
    title: "Cart Count Badge In Nav",
    points: 100,
    level: "Beginner",
    tasks: [
      "Show total cart item count in the top nav.",
      "Update the count after Add to Cart without page refresh.",
      "Handle loading and empty cart states.",
    ],
  },
  {
    title: "Checkout API + Success Flow",
    points: 100,
    level: "Beginner",
    tasks: [
      "Create POST /api/checkout endpoint.",
      "Accept fake payment payload and validate input.",
      "Clear cart after successful checkout.",
      "Redirect user to /checkout/success page.",
    ],
  },
  {
    title: "Cart Page + Client State Memory",
    points: 100,
    level: "Beginner",
    tasks: [
      "Create a /cart page that lists products currently in cart.",
      "Track cart state in memory with React Context.",
      "Persist cart state with localStorage so refresh keeps cart data.",
      "Add quantity update and remove actions in cart UI.",
      "If Fake Store checkout is limited, implement mock checkout flow with useState/localStorage or Zustand.",
    ],
  },
  {
    title: "Custom Database Migration",
    points: 100,
    level: "Intermediate",
    tasks: [
      "Replace Fake Store product/cart persistence with your own database.",
      "Pick Prisma or Drizzle and model users, products, carts, cartItems, orders.",
      "Keep API contracts stable while swapping data layer.",
    ],
  },
  {
    title: "Create Custom API Suite",
    points: 100,
    level: "Intermediate",
    tasks: [
      "Design your own REST API namespace for products, carts, users, orders.",
      "Add pagination, filters, and consistent error format.",
      "Create Postman or Thunder Client collection for testing.",
    ],
  },
  {
    title: "Shadcn Form System",
    points: 100,
    level: "Intermediate",
    tasks: [
      "Build reusable form primitives with shadcn/ui.",
      "Create shared validation with zod for login/register/checkout.",
      "Reuse one form system across all pages.",
    ],
  },
  {
    title: "Auth Upgrade",
    points: 100,
    level: "Advanced",
    tasks: [
      "Upgrade login/register to use email + password.",
      "Store users securely in your own DB.",
      "Add password hashing and stronger session strategy.",
    ],
  },
  {
    title: "Order + Payment Domain",
    points: 100,
    level: "Advanced",
    tasks: [
      "Create order lifecycle: pending, paid, fulfilled, cancelled.",
      "Add fake payment provider adapter with clear service boundaries.",
      "Persist order snapshots and line items.",
    ],
  },
  {
    title: "Email Notifications",
    points: 100,
    level: "Advanced",
    tasks: [
      "Integrate Nodemailer for transactional emails.",
      "Send order confirmation email after checkout.",
      "Send welcome email after registration.",
    ],
  },
];

export default function ChallengesPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
      <AppNav />
      <h1 className="text-3xl font-bold text-slate-900">BriteStore Challenges</h1>
      <p className="mt-3 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
        Start under the current Fake Store API version first. Complete baseline features before
        attempting these challenges.
      </p>
      <p className="mt-3 text-slate-600">
        Each challenge is worth <span className="font-semibold">100 points</span>.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {challenges.map((challenge) => (
          <article
            key={challenge.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">{challenge.title}</h2>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {challenge.points} pts
              </span>
            </div>
            <p className="mb-3 text-sm font-medium text-blue-700">{challenge.level}</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              {challenge.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
