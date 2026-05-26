import { useEffect } from "react";
import PartyPopper from "~icons/custom/party-popper";

import { _ } from "~/lib/i18n";
import { levelUpSfx, successSfx } from "~/lib/sounds";
import { getSFXEnabled } from "~/lib/storage";

import ConfirmModal from "./ConfirmModal";

const PartyPopperStyled = () => (
  <PartyPopper style={{ height: "1.3em", width: "auto" }} />
);

type Props = {
  level: number;
  restoredEnergy: number;
  skillPoints: number;
  [key: string]: any;
};

export default function LevelUpModal({
  level,
  restoredEnergy,
  skillPoints,
  ...props
}: Props) {
  useEffect(() => {
    if (getSFXEnabled()) {
      successSfx.stop(); // avoid mixed sounds
      levelUpSfx.play();
    }
  }, [level]);

  return (
    <ConfirmModal {...props}>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: "2em" }}>
          {_("You Leveled Up!")}
          <hr />
        </div>
        <div style={{ fontSize: "0.8em", paddingBottom: "0.4em" }}>
          {_("Now at level")}
        </div>
        <div style={{ fontSize: "1.5em" }}>
          <PartyPopperStyled />
          <span style={{ paddingLeft: "0.2em", paddingRight: "0.2em" }}>
            {level}
          </span>
          <PartyPopperStyled />
        </div>
        <div style={{ marginTop: "1em" }}>
          {_("Skill Points: +{{x}}").replace("{{x}}", String(skillPoints))}
        </div>
        {restoredEnergy > 0 && (
          <div style={{ marginTop: "1em" }}>
            {_("Energy restored: +{{x}}").replace(
              "{{x}}",
              String(restoredEnergy),
            )}
          </div>
        )}
      </div>
    </ConfirmModal>
  );
}
