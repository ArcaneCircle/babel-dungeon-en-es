import { useState, useCallback } from "react";
import PixelPlaySolid from "~icons/pixel/play-solid";
import PixelCrownSolid from "~icons/pixel/crown-solid";
import PixelFireSolid from "~icons/pixel/fire-solid";
import PixelBoltSolid from "~icons/pixel/bolt-solid";
import PixelSparklesSolid from "~icons/pixel/sparkles-solid";
import PixelCogSolid from "~icons/pixel/cog-solid";
import StarSolidIcon from "~icons/pixel/star-solid?width=1em&height=1em";

import { _ } from "~/lib/i18n";
import { getLastPlayed } from "~/lib/storage";
import { ON_FIRE_STREAK_THRESHOLD } from "~/lib/game";
import {
  MAIN_COLOR,
  GOLDEN,
  BLUE,
  YELLOW,
  BORDER_COLOR,
  TEXT_PRIMARY,
  TEXT_TERTIARY,
  BG_SECONDARY,
} from "~/lib/theme";

import { ModalContext } from "~/components/modals/Modal";
import NoEnergyModal from "~/components/modals/NoEnergyModal";
import GameModeModal from "~/components/modals/GameModeModal";
import SettingsModal from "~/components/modals/SettingsModal";
import CreditsModal from "~/components/modals/CreditsModal";
import PixelatedProgressBar from "~/components/PixelatedProgressBar";
import StatSection from "~/components/StatSection";
import MenuButton from "~/components/MenuButton";

const card = {
  display: "flex",
  flexDirection: "column" as "column",
  border: `2px solid ${BORDER_COLOR}`,
  padding: "10px",
};

const btnIcon = { fontSize: "1.5em" };

const baseBtn = {
  color: TEXT_PRIMARY,
  backgroundColor: BG_SECONDARY,
  padding: "0.6em 0.5em",
};

const secondaryBtnRow = {
  display: "flex",
  gap: "1em",
  marginTop: "1em",
};

interface Props {
  player: Player;
  onShowSkills: () => void;
}

export default function Home({ player, onShowSkills }: Props) {
  const [modal, setModal] = useState(
    null as "noEnergy" | "play" | "settings" | "credits" | null,
  );
  const today = new Date().setHours(0, 0, 0, 0);
  const lastPlayed = getLastPlayed();
  const epicStreak = player.streak >= ON_FIRE_STREAK_THRESHOLD;
  const streakColor =
    lastPlayed === today ? (epicStreak ? GOLDEN : MAIN_COLOR) : TEXT_TERTIARY;
  const streakSize = player.streak > 999 ? "0.9em" : undefined;
  const toReviewColor = player.toReview ? undefined : MAIN_COLOR;

  const maxSeenRank = player.seen === player.total;
  const seenProgress = maxSeenRank ? 100 : player.seen % 100;
  const seenRankColor = maxSeenRank ? MAIN_COLOR : undefined;
  const maxMasteredRank = player.mastered === player.total;
  const masteredProgress = maxMasteredRank ? 100 : player.mastered % 100;
  const masteredRankColor = maxMasteredRank ? GOLDEN : undefined;

  const onPlay = useCallback(() => setModal("play"), []);
  const onShowSettings = useCallback(() => setModal("settings"), []);
  const setOpen = useCallback(
    (show: boolean) => (show ? setModal(modal) : setModal(null)),
    [modal],
  );
  const onNoEnergy = useCallback(() => setModal("noEnergy"), []);

  return (
    <>
      <ModalContext.Provider value={{ isOpen: !!modal, setOpen }}>
        {modal === "noEnergy" ? (
          <NoEnergyModal />
        ) : modal === "play" ? (
          <GameModeModal
            player={player}
            onNoEnergy={onNoEnergy}
            style={{ minWidth: "60vw" }}
          />
        ) : modal === "settings" ? (
          <SettingsModal onShowCredits={() => setModal("credits")} />
        ) : modal === "credits" ? (
          <CreditsModal />
        ) : null}
      </ModalContext.Provider>

      <div style={{ padding: "0.5em" }}>
        <div className="pixel-corners" style={{ ...card, marginBottom: "1em" }}>
          <StatSection
            title={_("LEVEL")}
            number={player.lvl}
            style={{ paddingBottom: "1em" }}
          />
          <div style={{ paddingBottom: "0.5em" }}>
            <PixelSparklesSolid
              style={{
                float: "left",
                paddingRight: "0.5em",
              }}
            />
            <PixelatedProgressBar
              progress={player.totalXp ? player.xp : 100}
              total={player.totalXp || 100}
              color={BLUE}
              label={
                player.totalXp ? `${player.xp}/${player.totalXp}` : _("MAX")
              }
            />
          </div>

          <div style={{ marginBottom: "1em" }}>
            <PixelBoltSolid
              style={{
                float: "left",
                paddingRight: "0.5em",
              }}
            />
            <PixelatedProgressBar
              progress={player.energy}
              total={player.maxEnergy}
              color={YELLOW}
              label={`${player.energy}/${player.maxEnergy}`}
            />
          </div>

          <StatSection
            title={_("STREAK:")}
            number={player.streak}
            numberSize={streakSize}
            numberColor={streakColor}
            unit={_(player.streak === 1 ? "day" : "days")}
            style={{ paddingBottom: "1em" }}
            icon={<PixelFireSolid style={{ color: streakColor }} />}
          />
          <StatSection
            title={_("PLAYED:")}
            number={player.studiedToday}
            unit={_("today")}
            style={{ paddingBottom: "1em" }}
          />
          <StatSection
            title={_("REVIEW:")}
            number={player.toReview}
            numberColor={toReviewColor}
          />
        </div>
        <div className="pixel-corners" style={card}>
          <div style={{ paddingTop: "0.5em", paddingBottom: "1em" }}>
            <div style={{ paddingBottom: "0.3em" }}>
              {_("Discovered:")}
              <span style={{ display: "inline", float: "right" }}>
                <PixelCrownSolid
                  style={{ color: MAIN_COLOR, marginRight: "0.2em" }}
                />
                <span style={{ color: seenRankColor }}>
                  {Math.floor(player.seen / 100)}
                </span>
              </span>
            </div>
            <PixelatedProgressBar
              progress={seenProgress}
              total={100}
              color={MAIN_COLOR}
              label={`${seenProgress}/100`}
            />
          </div>
          <div style={{ paddingBottom: "0.5em" }}>
            <div style={{ paddingBottom: "0.3em" }}>
              {_("Mastered:")}
              <span style={{ display: "inline", float: "right" }}>
                <PixelCrownSolid
                  style={{ color: GOLDEN, marginRight: "0.2em" }}
                />
                <span style={{ color: masteredRankColor }}>
                  {Math.floor(player.mastered / 100)}
                </span>
              </span>
            </div>
            <PixelatedProgressBar
              progress={masteredProgress}
              total={100}
              color={GOLDEN}
              label={`${masteredProgress}/100`}
            />
          </div>
        </div>

        <div style={secondaryBtnRow}>
          <MenuButton style={baseBtn} onClick={onShowSettings}>
            <PixelCogSolid style={btnIcon} />
          </MenuButton>
          <MenuButton
            className={player.skillPoints ? "skills-btn-attention" : undefined}
            style={{
              ...baseBtn,
              backgroundColor: player.skillPoints ? GOLDEN : BG_SECONDARY,
              color: player.skillPoints ? "black" : TEXT_PRIMARY,
            }}
            onClick={onShowSkills}
          >
            <StarSolidIcon style={btnIcon} />
          </MenuButton>
        </div>
        <MenuButton
          style={{
            ...baseBtn,
            marginTop: "1em",
            color: "black",
            background: MAIN_COLOR,
          }}
          onClick={onPlay}
        >
          <PixelPlaySolid style={btnIcon} />
        </MenuButton>
      </div>
    </>
  );
}
