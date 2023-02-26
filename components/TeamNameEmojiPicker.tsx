import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { EmojiClickData } from "emoji-picker-react";
import dynamic from "next/dynamic";
import { TeamsContext } from '../context/teamContext';

type TeamNameEmojiPickerProps = {
	show: boolean
	uuid: string
	onSetShowEmojiPicker: (val: boolean) => void
}

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

const TeamNameEmojiPicker = ({ show, uuid, onSetShowEmojiPicker }: TeamNameEmojiPickerProps) => {
	const emojiPickerReff = useRef(null);
	const { setTeams, teams, setIsUpdateTeamDetail } = useContext(TeamsContext);

	const handleOnEmojiClick = useCallback(({ emoji: newEmoji }: EmojiClickData) => {
		const newAllTeams = teams.map(t => t.uuid !== uuid ? t : { ...t, emoji: newEmoji })
		setIsUpdateTeamDetail(true)
		onSetShowEmojiPicker(false)
		setTeams(newAllTeams)
	}, [teams])

	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				onSetShowEmojiPicker(false)
			}
		}

		function handleMouseDown(e: MouseEvent) {
			if (
				emojiPickerReff.current &&
				!(emojiPickerReff.current as HTMLElement).contains(e.target as HTMLElement)
			) {
				onSetShowEmojiPicker(false)
			}
		}

		document.addEventListener("keydown", handleKeyDown, false)
		document.addEventListener("mousedown", handleMouseDown, false)

		return () => {
			document.removeEventListener("keydown", handleKeyDown, false)
			document.removeEventListener("mousedown", handleMouseDown, false)
		}
	}, [])

	if (!show) {
		return null
	}

	return (
		<div className="absolute" ref={emojiPickerReff}>
			<EmojiPicker width={"15em"} onEmojiClick={handleOnEmojiClick} />
		</div>
	)
}

export default TeamNameEmojiPicker