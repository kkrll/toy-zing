import { AiLoader } from "@/components/primitives/AiLoader";
import { cn } from "@/lib/utils";

type AvatarPersona = "Jan" | "Chris" | "Sarah" | "Jennifer" | "Logo";
type AvatarSize = "sm" | "lg";

export type AvatarType = {
  persona: AvatarPersona;
  size: AvatarSize;
  aiIcon: boolean;
};

export type AvatarProps = AvatarType & {
  className?: string;
  alt?: string;
};

const AVATAR_SRC: Record<AvatarPersona, string> = {
  Jan: "/avatars/Jan.webp",
  Chris: "/avatars/Chris.webp",
  Sarah: "/avatars/Sarah.webp",
  Jennifer: "/avatars/Jennifer.webp",
  Logo: "/avatars/Logo.webp",
};

const AVATAR_SIZE_CLASSNAME: Record<AvatarSize, string> = {
  sm: "size-11",
  lg: "size-20",
};

const BADGE_SIZE_PX = 20;

function badgeCutoutMask(badgePx: number, nudge = 0) {
  const half = badgePx / 2;
  const cutoutRadius = half + 2; // 2 px breathing room
  const cx = half - nudge;
  const cy = half - nudge;
  return `radial-gradient(circle ${cutoutRadius}px at calc(100% - ${cx}px) calc(100% - ${cy}px), transparent 100%, black 100%)`;
}

const BADGE_NUDGE_PX: Record<AvatarSize, number> = {
  sm: 4,
  lg: 0,
};

export function Avatar({
  aiIcon,
  alt,
  className,
  persona,
  size,
}: AvatarProps) {
  const isLogo = persona === "Logo";

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0",
        AVATAR_SIZE_CLASSNAME[size],
        className,
      )}
    >
      <img
        src={AVATAR_SRC[persona]}
        alt={alt ?? (isLogo ? "Zing logo" : `${persona} avatar`)}
        className={cn(
          "size-full shrink-0 object-cover",
          isLogo ? "" : "rounded-full bg-grey-200",
        )}
        style={aiIcon && !isLogo ? { maskImage: badgeCutoutMask(BADGE_SIZE_PX, BADGE_NUDGE_PX[size]) } : undefined}
      />
      {aiIcon ? (
        <span
          className="absolute inline-flex items-center justify-center rounded-full overflow-hidden"
          style={{
            width: BADGE_SIZE_PX,
            height: BADGE_SIZE_PX,
            bottom: size === "sm" ? "-4px" : "0px",
            right: size === "sm" ? "-4px" : "0px",
            background:
              "linear-gradient(90deg, var(--orchid-300, #BFA1FB) 0%, var(--orchid-500, #8C25F4) 50%, var(--blue-500, #546EFF) 100%)",
          }}
        >
          <AiLoader className="size-full" color="white" />
        </span>
      ) : null}
    </div>
  );
}
