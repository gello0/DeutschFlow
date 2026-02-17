
import { VocabWord, WordProgress } from "../types";

/**
 * Selects words for a session using a weighted random algorithm.
 * Words with lower success counts (harder/newer) are given higher weights.
 */
export const selectWordsForSession = (
  pool: VocabWord[],
  progressMap: Record<string, WordProgress>,
  sessionSize: number
): VocabWord[] => {
  // 1. Calculate weights for each word
  // Weight logic:
  // - New words (no progress): Weight 100 (High priority)
  // - Success Count 0 (Failed before): Weight 100
  // - Success Count 1: Weight 50
  // - Success Count 2: Weight 25
  // - Success Count 3+: Weight 5 (If they slip into the pool)
  
  const weightedItems = pool.map(word => {
    const progress = progressMap[word.german];
    let weight = 100; // Default / High priority

    if (progress) {
      // Exponential decay: weight halves for each success
      weight = Math.max(5, 100 / Math.pow(2, progress.successCount));
    }

    return { word, weight };
  });

  // 2. Weighted Random Selection
  const selected: VocabWord[] = [];
  // Create a mutable copy of the pool to pick from
  const available = [...weightedItems];

  while (selected.length < sessionSize && available.length > 0) {
    // Sum total weight of currently available items
    const totalWeight = available.reduce((sum, item) => sum + item.weight, 0);
    
    // Pick a random value within the total weight
    let randomPointer = Math.random() * totalWeight;
    
    // Find the item corresponding to the random pointer
    let selectedIndex = -1;
    for (let i = 0; i < available.length; i++) {
      randomPointer -= available[i].weight;
      if (randomPointer <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    // Fallback for rounding errors (pick last)
    if (selectedIndex === -1) selectedIndex = available.length - 1;

    // Add selected word
    selected.push(available[selectedIndex].word);
    
    // Remove from available so we don't pick it again in this session
    available.splice(selectedIndex, 1);
  }

  return selected;
};
