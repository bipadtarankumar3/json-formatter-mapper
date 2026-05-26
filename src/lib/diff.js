/**
 * Performs a line-by-line diff using the Longest Common Subsequence (LCS) algorithm.
 * For massive files (> 1500 lines), it falls back to a faster hash-based line matching
 * to avoid browser-freezing O(N^2) memory and execution overhead.
 */
export function diffLines(oldStr, newStr) {
  const oldLines = oldStr.split('\n');
  const newLines = newStr.split('\n');
  
  const oldLen = oldLines.length;
  const newLen = newLines.length;

  // Fallback for massive files to prevent O(N^2) stack overflow / memory exhaustion
  if (oldLen > 1500 || newLen > 1500) {
    return fastDiffLines(oldLines, newLines);
  }
  
  const dp = Array.from({ length: oldLen + 1 }, () => Array(newLen + 1).fill(0));
  
  for (let i = 1; i <= oldLen; i++) {
    for (let j = 1; j <= newLen; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  const diff = [];
  let i = oldLen;
  let j = newLen;
  
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      diff.unshift({
        type: 'unmodified',
        value: oldLines[i - 1],
        oldLineNumber: i,
        newLineNumber: j
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({
        type: 'added',
        value: newLines[j - 1],
        oldLineNumber: null,
        newLineNumber: j
      });
      j--;
    } else {
      diff.unshift({
        type: 'removed',
        value: oldLines[i - 1],
        oldLineNumber: i,
        newLineNumber: null
      });
      i--;
    }
  }
  
  return diff;
}

/**
 * Fast fallback diff for larger inputs. Performs a sliding index line-match.
 */
function fastDiffLines(oldLines, newLines) {
  const diff = [];
  let i = 0;
  let j = 0;
  
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      diff.push({
        type: 'unmodified',
        value: oldLines[i],
        oldLineNumber: i + 1,
        newLineNumber: j + 1
      });
      i++;
      j++;
    } else {
      // Look ahead to check if line matches soon
      let matchFound = false;
      const lookAhead = 10;
      
      for (let k = 1; k <= lookAhead; k++) {
        if (j + k < newLines.length && oldLines[i] === newLines[j + k]) {
          // Lines j to j + k were added
          for (let m = 0; m < k; m++) {
            diff.push({
              type: 'added',
              value: newLines[j + m],
              oldLineNumber: null,
              newLineNumber: j + m + 1
            });
          }
          j += k;
          matchFound = true;
          break;
        }
        if (i + k < oldLines.length && oldLines[i + k] === newLines[j]) {
          // Lines i to i + k were removed
          for (let m = 0; m < k; m++) {
            diff.push({
              type: 'removed',
              value: oldLines[i + m],
              oldLineNumber: i + m + 1,
              newLineNumber: null
            });
          }
          i += k;
          matchFound = true;
          break;
        }
      }
      
      if (!matchFound) {
        // If no match within look-ahead, treat as replacement (remove old, add new)
        if (i < oldLines.length) {
          diff.push({
            type: 'removed',
            value: oldLines[i],
            oldLineNumber: i + 1,
            newLineNumber: null
          });
          i++;
        }
        if (j < newLines.length) {
          diff.push({
            type: 'added',
            value: newLines[j],
            oldLineNumber: null,
            newLineNumber: j + 1
          });
          j++;
        }
      }
    }
  }
  
  return diff;
}
