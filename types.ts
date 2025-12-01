export enum EmotionType {
  NEUTRAL = 'Neutral',
  HAPPY = 'Happy',
  ANGRY = 'Angry',
  SAD = 'Sad',
  SURPRISED = 'Surprised',
  FEAR = 'Fear'
}

export interface EmotionData {
  type: EmotionType;
  confidence: number;
  timestamp: number;
}

export const EMOTION_COLORS: Record<EmotionType, string> = {
  [EmotionType.NEUTRAL]: '#00f3ff', // Cyan
  [EmotionType.HAPPY]: '#00ff9d',   // Green
  [EmotionType.ANGRY]: '#ff003c',   // Red
  [EmotionType.SAD]: '#4a90e2',     // Blue
  [EmotionType.SURPRISED]: '#f8e71c', // Yellow
  [EmotionType.FEAR]: '#9013fe',    // Purple
};
