import { useCallback } from "react";

import { _ } from "~/lib/i18n";
import {
  upgradeSkill,
  getMotivatedRestorePercent,
  MOTIVATED_BASE_RESTORE_PERCENT,
  MOTIVATED_SKILL_PER_LEVEL_PERCENT,
  MOTIVATED_SKILL_MAX_LEVEL,
  MAX_ENERGY_SKILL_MAX_LEVEL,
} from "~/lib/game";
import {
  MAIN_COLOR,
  BG_SECONDARY,
  BG_TERTIARY,
  BORDER_COLOR,
  TEXT_PRIMARY,
  TEXT_TERTIARY,
  BLUE,
} from "~/lib/theme";

import MenuButton from "~/components/MenuButton";

const card = {
  display: "flex",
  flexDirection: "column" as "column",
  border: `1px solid ${BORDER_COLOR}`,
  borderRadius: "5px",
  padding: "1em",
  marginBottom: "1em",
};

interface Props {
  player: Player;
  onBack: () => void;
}

export default function Skills({ player, onBack }: Props) {
  const motivatedLevel = player.skills.motivated;
  const motivatedPercent = getMotivatedRestorePercent(motivatedLevel);
  const maxEnergyLevel = player.skills.maxEnergy;
  const canUpgradeMotivated =
    player.skillPoints > 0 && motivatedLevel < MOTIVATED_SKILL_MAX_LEVEL;
  const canUpgradeMaxEnergy =
    player.skillPoints > 0 && maxEnergyLevel < MAX_ENERGY_SKILL_MAX_LEVEL;

  const onUpgradeMotivated = useCallback(async () => {
    await upgradeSkill("motivated");
  }, []);
  const onUpgradeMaxEnergy = useCallback(async () => {
    await upgradeSkill("maxEnergy");
  }, []);

  const currMotivated = _("{{x}}% of max. energy restored").replace(
    "{{x}}",
    String(motivatedPercent),
  );
  const currMaxEnergy = _("+{{x}} max. energy").replace(
    "{{x}}",
    `${maxEnergyLevel}`,
  );

  return (
    <div style={{ padding: "0.5em" }}>
      <div style={card}>
        <div style={{ fontSize: "1.2em", color: MAIN_COLOR }}>
          {_("SKILLS")}
        </div>
        <div style={{ marginTop: "1em" }}>
          {_("Spend skill points to upgrade your passive abilities.")}
        </div>
        <div style={{ marginTop: "1em", color: BLUE }}>
          {_("Skill Points: {{x}}").replace(
            "{{x}}",
            String(player.skillPoints),
          )}
        </div>
      </div>

      <div style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <div style={{ color: MAIN_COLOR, fontSize: "1.1em" }}>
            {_("Blessed")}
          </div>
          <div>
            {_("LEVEL")} {motivatedLevel}/{MOTIVATED_SKILL_MAX_LEVEL}
          </div>
        </div>
        <div style={{ marginTop: "1em", lineHeight: 1.6 }}>
          {_(
            "When you level up, a surge of divine energy flows through your body instantly restoring {{base}}% of your maximum energy, plus an additional +{{inc}}% per upgrade.",
          )
            .replace("{{base}}", String(MOTIVATED_BASE_RESTORE_PERCENT))
            .replace("{{inc}}", String(MOTIVATED_SKILL_PER_LEVEL_PERCENT))}
        </div>
        <div style={{ marginTop: "1em", color: TEXT_TERTIARY }}>
          {_("Current Level: {{x}}").replace("{{x}}", currMotivated)}
        </div>
        <MenuButton
          disabled={!canUpgradeMotivated}
          onClick={onUpgradeMotivated}
          style={{
            marginTop: "1.5em",
            color: canUpgradeMotivated ? "black" : TEXT_PRIMARY,
            background: canUpgradeMotivated ? MAIN_COLOR : BG_TERTIARY,
            opacity: canUpgradeMotivated ? 1 : 0.7,
          }}
        >
          {motivatedLevel >= MOTIVATED_SKILL_MAX_LEVEL
            ? _("MAXED")
            : _("Upgrade")}
        </MenuButton>
      </div>

      <div style={card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1em",
            alignItems: "center",
          }}
        >
          <div style={{ color: MAIN_COLOR, fontSize: "1.1em" }}>
            {_("Stamina")}
          </div>
          <div>
            {_("LEVEL")} {maxEnergyLevel}/{MAX_ENERGY_SKILL_MAX_LEVEL}
          </div>
        </div>
        <div style={{ marginTop: "1em", lineHeight: 1.6 }}>
          {_("Increases your maximum energy by +1 per upgrade.")}
        </div>
        <div style={{ marginTop: "1em", color: TEXT_TERTIARY }}>
          {_("Current Level: {{x}}").replace("{{x}}", currMaxEnergy)}
        </div>
        <MenuButton
          disabled={!canUpgradeMaxEnergy}
          onClick={onUpgradeMaxEnergy}
          style={{
            marginTop: "1.5em",
            color: canUpgradeMaxEnergy ? "black" : TEXT_PRIMARY,
            background: canUpgradeMaxEnergy ? MAIN_COLOR : BG_TERTIARY,
            opacity: canUpgradeMaxEnergy ? 1 : 0.7,
          }}
        >
          {maxEnergyLevel >= MAX_ENERGY_SKILL_MAX_LEVEL
            ? _("MAXED")
            : _("Upgrade")}
        </MenuButton>
      </div>

      <MenuButton
        onClick={onBack}
        style={{
          color: TEXT_PRIMARY,
          backgroundColor: BG_SECONDARY,
          marginTop: "1em",
        }}
      >
        {_("Back")}
      </MenuButton>
    </div>
  );
}
