import { useCallback } from "react";

import { _ } from "~/lib/i18n";
import {
  upgradeSkill,
  getMotivatedRestorePercent,
  MOTIVATED_BASE_RESTORE_PERCENT,
  MOTIVATED_SKILL_PER_LEVEL_PERCENT,
  MOTIVATED_SKILL_MAX_LEVEL,
  MAX_ENERGY_SKILL_MAX_LEVEL,
  BERSERKER_SKILL_MAX_LEVEL,
  getBerserkerReductionPercent,
  GOLDEN_TOUCH_SKILL_MAX_LEVEL,
  LIFE_STEAL_SKILL_MAX_LEVEL,
  LIFE_STEAL_BASE_CHANCE,
  LIFE_STEAL_CHANCE_PER_LEVEL,
  getLifeStealChance,
  CRITICAL_HIT_SKILL_MAX_LEVEL,
  CRITICAL_HIT_BASE_CHANCE,
  CRITICAL_HIT_CHANCE_PER_LEVEL,
  getCriticalHitChance,
  FAST_LEARNER_SKILL_MAX_LEVEL,
  ON_FIRE_SKILL_MAX_LEVEL,
  ON_FIRE_BASE_XP_PER_UPGRADE,
  ON_FIRE_STREAK_THRESHOLD,
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
  const currBerserkerEasy = getBerserkerReductionPercent(
    "easy",
    player.toReview,
    player.skills.berserker,
  );
  const currBerserkerNormal = getBerserkerReductionPercent(
    "normal",
    player.toReview,
    player.skills.berserker,
  );

  return (
    <div style={{ padding: "0.5em" }}>
      <div style={card}>
        <div style={{ fontSize: "1.2em", color: MAIN_COLOR }}>
          {_("SKILLS")}
        </div>
        <div style={{ marginTop: "1em", lineHeight: 1.6 }}>
          {_("Spend skill points to upgrade your passive abilities.")}
        </div>
        <div style={{ marginTop: "1em", color: BLUE }}>
          {_("Skill Points: {{x}}").replace(
            "{{x}}",
            String(player.skillPoints),
          )}
        </div>
      </div>

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"motivated"}
        skillName={_("Blessed")}
        skillLevel={player.skills.motivated}
        skillMaxLevel={MOTIVATED_SKILL_MAX_LEVEL}
        skillDescription={_(
          "When you level up, a surge of divine energy flows through your body instantly restoring {{base}}% of your maximum energy, plus an additional +{{inc}}% per upgrade.",
        )
          .replace("{{base}}", String(MOTIVATED_BASE_RESTORE_PERCENT))
          .replace("{{inc}}", String(MOTIVATED_SKILL_PER_LEVEL_PERCENT))}
        skillSummary={_("{{x}}% of max. energy restored").replace(
          "{{x}}",
          String(getMotivatedRestorePercent(player.skills.motivated)),
        )}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"maxEnergy"}
        skillName={_("Stamina")}
        skillLevel={player.skills.maxEnergy}
        skillMaxLevel={MAX_ENERGY_SKILL_MAX_LEVEL}
        skillDescription={_(
          "Increases your maximum energy by +10 per upgrade.",
        )}
        skillSummary={_("+{{x}} max. energy").replace(
          "{{x}}",
          `${player.skills.maxEnergy * 10}`,
        )}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"berserker"}
        skillName={_("Berserker")}
        skillLevel={player.skills.berserker}
        skillMaxLevel={BERSERKER_SKILL_MAX_LEVEL}
        skillDescription={_(
          "Having so much pending sentences to review starts to put your mind into overdrive. The heavier the workload, the less energy each review session consumes. Reduces energy cost based on pending reviews: 100+ (-0.4%), 200+ (-0.8%), 300+ (-1.2%), 400+ (-1.6%), 500+ (-2%) per upgrade.",
        )}
        skillSummary={_(
          "-{{easy}}% easy / -{{normal}}% normal with {{x}} to review",
        )
          .replace("{{easy}}", String(currBerserkerEasy))
          .replace("{{normal}}", String(currBerserkerNormal))
          .replace("{{x}}", String(player.toReview))}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"goldenTouch"}
        skillName={_("Golden Touch")}
        skillLevel={player.skills.goldenTouch}
        skillMaxLevel={GOLDEN_TOUCH_SKILL_MAX_LEVEL}
        skillDescription={_(
          "Pressing the golden button increases the monster's level more than usual, +1 level per upgrade.",
        )}
        skillSummary={_(
          "Monster's level increased by +{{x}} when the golden button is used",
        ).replace("{{x}}", String(5 + player.skills.goldenTouch))}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"lifeSteal"}
        skillName={_("Life Steal")}
        skillLevel={player.skills.lifeSteal}
        skillMaxLevel={LIFE_STEAL_SKILL_MAX_LEVEL}
        skillDescription={_(
          "Each correct answer has a {{base}}% chance of restoring +5 energy, plus an additional +{{inc}}% chance per upgrade.",
        )
          .replace("{{base}}", String(LIFE_STEAL_BASE_CHANCE))
          .replace("{{inc}}", String(LIFE_STEAL_CHANCE_PER_LEVEL))}
        skillSummary={_("{{x}}% chance of +5 energy on correct answer").replace(
          "{{x}}",
          String(getLifeStealChance(player.skills.lifeSteal)),
        )}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"criticalHit"}
        skillName={_("Critical Hit")}
        skillLevel={player.skills.criticalHit}
        skillMaxLevel={CRITICAL_HIT_SKILL_MAX_LEVEL}
        skillDescription={_(
          "Each correct answer has a {{base}}% chance to grant x1.5 XP, plus an additional +{{inc}}% chance per upgrade.",
        )
          .replace("{{base}}", String(CRITICAL_HIT_BASE_CHANCE))
          .replace("{{inc}}", String(CRITICAL_HIT_CHANCE_PER_LEVEL))}
        skillSummary={_("{{x}}% chance of x1.5 XP on correct answer").replace(
          "{{x}}",
          String(getCriticalHitChance(player.skills.criticalHit)),
        )}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"fastLearner"}
        skillName={_("Fast Learner")}
        skillLevel={player.skills.fastLearner}
        skillMaxLevel={FAST_LEARNER_SKILL_MAX_LEVEL}
        skillDescription={_(
          "You learn faster than the average person, earning more experience than usual per correctly answered sentence (+1 XP per upgrade).",
        )}
        skillSummary={_("+{{x}} XP per correct answer").replace(
          "{{x}}",
          String(player.skills.fastLearner),
        )}
      />

      <SkillCard
        availablePoints={player.skillPoints}
        skillId={"onFire"}
        skillName={_("On Fire")}
        skillLevel={player.skills.onFire}
        skillMaxLevel={ON_FIRE_SKILL_MAX_LEVEL}
        skillDescription={_(
          "Each day your streak increases and reaches {{min}} or higher, you gain +{{x}} XP per upgrade.",
        )
          .replace("{{min}}", String(ON_FIRE_STREAK_THRESHOLD))
          .replace("{{x}}", String(ON_FIRE_BASE_XP_PER_UPGRADE))}
        skillSummary={_("+{{x}} XP when streak increases to {{min}}+")
          .replace(
            "{{x}}",
            String(player.skills.onFire * ON_FIRE_BASE_XP_PER_UPGRADE),
          )
          .replace("{{min}}", String(ON_FIRE_STREAK_THRESHOLD))}
      />

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

interface SkillCardProps {
  availablePoints: number;
  skillId: keyof PlayerSkills;
  skillName: string;
  skillLevel: number;
  skillMaxLevel: number;
  skillDescription: string;
  skillSummary: string;
}

function SkillCard({
  availablePoints,
  skillId,
  skillName,
  skillLevel,
  skillMaxLevel,
  skillDescription,
  skillSummary,
}: SkillCardProps) {
  const canUpgrade = availablePoints > 0 && skillLevel < skillMaxLevel;
  const onUpgradeSkill = useCallback(async () => {
    await upgradeSkill(skillId);
  }, [skillId]);

  return (
    <div style={card}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1em",
          alignItems: "center",
        }}
      >
        <div style={{ color: MAIN_COLOR, fontSize: "1.1em" }}>{skillName}</div>
        <div>
          {_("LEVEL")} {skillLevel}/{skillMaxLevel}
        </div>
      </div>
      <div style={{ marginTop: "1em", lineHeight: 1.6 }}>
        {skillDescription}
      </div>
      <div style={{ marginTop: "1em", color: TEXT_TERTIARY }}>
        {_("Current Level: {{x}}").replace("{{x}}", skillSummary)}
      </div>
      <MenuButton
        disabled={!canUpgrade}
        onClick={onUpgradeSkill}
        style={{
          marginTop: "1.5em",
          color: canUpgrade ? "black" : TEXT_PRIMARY,
          background: canUpgrade ? MAIN_COLOR : BG_TERTIARY,
          opacity: canUpgrade ? 1 : 0.7,
        }}
      >
        {skillLevel >= skillMaxLevel ? _("MAXED") : _("Upgrade")}
      </MenuButton>
    </div>
  );
}
