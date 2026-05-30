import { MAIN_COLOR, RED } from "~/lib/theme";
import { _ } from "~/lib/i18n";
import { formatTime } from "~/lib/dateutil";

import ConfirmModal from "./ConfirmModal";

type Props = {
  time: number;
  xp: number;
  onFireXp: number;
  accuracy: number;
  [key: string]: any;
};

export default function ResultsModal({
  time,
  xp,
  onFireXp,
  accuracy,
  ...props
}: Props) {
  const divStyle = {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "space-between",
    marginTop: "1em",
  };
  const accuracyColor =
    accuracy >= 90 ? MAIN_COLOR : accuracy < 50 ? RED : undefined;
  return (
    <ConfirmModal {...props}>
      <div>
        <div style={{ marginBottom: onFireXp > 0 ? "1em" : "2em" }}>
          {_("ROUND COMPLETED!")}
          <hr />
        </div>
        <div style={{ textAlign: "center" }}>
          {onFireXp > 0 && (
            <>
              <img
                src={"/chest.png"}
                aria-hidden
                style={{
                  width: "5em",
                  height: "5em",
                  padding: "0 0.2em",
                }}
              />
              <div style={{ marginTop: "0.5em" }}>
                {_("+{{x}}xp").replace("{{x}}", String(onFireXp))}
              </div>
              <hr />
            </>
          )}

          <div style={divStyle}>
            <span>{_("Time:")}</span>
            <span>{formatTime(time)}</span>
          </div>

          <div style={divStyle}>
            <span>{_("Accuracy:")}</span>
            <span style={{ color: accuracyColor }}>{accuracy}%</span>
          </div>

          <div style={divStyle}>
            <span>{_("Total XP:")}</span>
            <span>+{xp}</span>
          </div>
        </div>
      </div>
    </ConfirmModal>
  );
}
