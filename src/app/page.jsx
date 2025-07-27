import { Hero } from "./components/Hero";
import { Form } from "./components/Form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80">
      <div className="container mx-auto px-4">
        <Hero />
        <Form />
      </div>
    </div>
  );
}
