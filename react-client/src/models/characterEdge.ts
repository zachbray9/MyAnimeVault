
import { Character } from "./character"
import { VoiceActor } from "./voiceActor"

export interface CharacterEdge {
    node: Character
    role: string
    voiceActors: VoiceActor[]
}