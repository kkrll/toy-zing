import { Avatar } from "@/components/primitives/Avatar";
import { Button } from "@/components/primitives/Button";
import { AiSparklesIcon } from "@/components/primitives/Icons";
import { useState } from "react";

const DSPage = () => {
  const [iconLeft, setIconLeft] = useState(false);
  const [iconRight, setIconRight] = useState(false);

  return (
    <main className="p-1000">
      <h1 className="mb-600">Design system</h1>
      <div className="grid grid-cols-3 mb-200 gap-500">
        <div className="flex flex-col gap-v-gap-buttons">
          <h2 className="mb-400">Buttons</h2>
          <div className="flex justify-between">
            <h3>White bg</h3>
            <div className="flex gap-1 bg-bg-light-grey p-50 rounded-2xl">
              <button
                onClick={() => setIconLeft(!iconLeft)}
                className={`${iconLeft ? "bg-button-bg-dark-primary text-white-100" : "bg-button-bg-light-primary"} px-200 py-50 rounded-xl cursor-pointer`}
              >
                iconLeft
              </button>
              <button
                onClick={() => setIconRight(!iconRight)}
                className={`${iconRight ? "bg-button-bg-dark-primary text-white-100" : "bg-button-bg-light-primary"} px-200 py-50 rounded-xl cursor-pointer`}
              >
                iconRight
              </button>
            </div>
          </div>
          <Button
            iconLeft={iconLeft ? <AiSparklesIcon size={32} /> : null}
            iconRight={iconRight ? <AiSparklesIcon size={32} /> : null}
          >
            Primary one
          </Button>
          <Button
            type="secondary"
            iconLeft={iconLeft ? <AiSparklesIcon size={32} /> : null}
            iconRight={iconRight ? <AiSparklesIcon size={32} /> : null}
          >
            Secondary one
          </Button>
          <Button
            type="promo"
            iconLeft={iconLeft ? <AiSparklesIcon size={32} /> : null}
            iconRight={iconRight ? <AiSparklesIcon size={32} /> : null}
          >
            Promo one
          </Button>
          <Button
            type="ghost"
            iconLeft={iconLeft ? <AiSparklesIcon size={32} /> : null}
            iconRight={iconRight ? <AiSparklesIcon size={32} /> : null}
          >
            Ghost one
          </Button>
        </div>
        <div className="flex flex-col gap-300">
          <h2 className="mb-400">Avatar</h2>
          <div className="flex gap-v-gap-buttons">
            <Avatar persona="Jan" size={"sm"} aiIcon={false} />
            <Avatar persona="Chris" size={"sm"} aiIcon={false} />
            <Avatar persona="Jennifer" size={"sm"} aiIcon={true} />
            <Avatar persona="Sarah" size={"sm"} aiIcon={true} />
            <Avatar persona="Logo" size={"sm"} aiIcon={true} />
          </div>
          <div className="flex gap-v-gap-buttons">
            <Avatar persona="Jan" size={"lg"} aiIcon={false} />
            <Avatar persona="Chris" size={"lg"} aiIcon={false} />
            <Avatar persona="Jennifer" size={"lg"} aiIcon={true} />
            <Avatar persona="Sarah" size={"lg"} aiIcon={true} />
            <Avatar persona="Logo" size={"lg"} aiIcon={true} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default DSPage;
