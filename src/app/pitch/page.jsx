import Image from "next/image";

import { PitchForm } from "@/components/PitchForm";
import desertPhoto from "@/images/photos/bug-5.jpg";

export const metadata = {
  title: "Pitch a Video",
  description: "Got an idea for a BugMoto video? Tell me about it.",
};

export default function Pitch() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-stretch">
      <section className="flex flex-col gap-6 bg-moto-red px-4 py-10 sm:px-8 lg:w-[42%] lg:gap-7 lg:px-12 lg:py-[72px]">
        <h1 className="display text-[clamp(4rem,19vw,8.5rem)] leading-[1.04] text-white lg:text-[clamp(4.5rem,9vw,8.5rem)]">
          Pitch me a video.
        </h1>
        <p className="max-w-[480px] text-xl leading-[1.42] font-medium lg:text-2xl">
          Got an idea for a BugMoto video? A road worth riding, gear worth
          testing, a question you&rsquo;d like answered? Tell me about it.
        </p>
        <p className="max-w-[480px] font-condensed text-[26px] leading-[1.15] font-bold lg:text-[30px]">
          I read every pitch, though I can&rsquo;t make them all or reply to
          each one.
        </p>
        <div className="relative hidden min-h-[300px] flex-1 lg:block">
          <Image
            src={desertPhoto}
            alt="Bug leaning on a loaded adventure motorcycle in high desert hills under a big sky"
            fill
            sizes="35vw"
            className="object-cover object-[50%_62%]"
          />
        </div>
      </section>
      <section className="px-4 py-10 sm:px-8 lg:flex-1 lg:px-12 lg:py-16">
        <PitchForm />
      </section>
    </div>
  );
}
