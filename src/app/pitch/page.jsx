import { PitchForm } from "@/components/PitchForm";
import { SimpleLayout } from "@/components/SimpleLayout";

export const metadata = {
  title: "Pitch a Video",
  description: "Got an idea for a BugMoto video? Tell me about it.",
};

export default function Pitch() {
  return (
    <SimpleLayout
      title="Pitch me a video."
      intro="Got an idea for a BugMoto video? A road worth riding, gear worth testing, a question you'd like answered? Tell me about it. I read every pitch, though I can't make them all or reply to each one."
    >
      <div className="max-w-2xl">
        <PitchForm />
      </div>
    </SimpleLayout>
  );
}
