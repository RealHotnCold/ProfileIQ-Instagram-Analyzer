import { NormalizedInstagramInput, InputValidationError } from '../src/types.js';

/**
 * Normalizes and validates raw Instagram user input.
 * Accepts:
 * - @username
 * - username
 * - instagram.com/username
 * - www.instagram.com/username
 * - https://instagram.com/username
 * - https://www.instagram.com/username/
 * - URLs with query params (e.g. ?igsh=...)
 * 
 * Rejects:
 * - Malformed URLs
 * - Post URLs (/p/...)
 * - Reel URLs (/reel/..., /reels/...)
 * - Story URLs (/stories/...)
 * - Reserved Instagram system routes (/explore/, /direct/, /accounts/, /help/)
 * - Empty or whitespace input
 * - Invalid characters in username
 */
export function normalizeInstagramInput(input: string): {
  success: boolean;
  data?: NormalizedInstagramInput;
  error?: InputValidationError;
} {
  if (!input || typeof input !== 'string') {
    return {
      success: false,
      error: {
        field: 'input',
        message: 'Please enter an Instagram handle or profile URL.',
        suggestion: 'Example: @nike or https://www.instagram.com/nike/'
      }
    };
  }

  let cleaned = input.trim();
  if (!cleaned) {
    return {
      success: false,
      error: {
        field: 'input',
        message: 'Input cannot be blank.',
        suggestion: 'Enter a valid handle such as @nike'
      }
    };
  }

  // Remove leading @ if typed as plain handle
  if (cleaned.startsWith('@')) {
    cleaned = cleaned.slice(1).trim();
  }

  let extractedHandle = '';

  // Check if user entered a full URL or domain path
  if (cleaned.includes('instagram.com') || cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    let urlString = cleaned;
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
      urlString = `https://${urlString}`;
    }

    try {
      const parsedUrl = new URL(urlString);
      const host = parsedUrl.hostname.toLowerCase();

      if (!host.includes('instagram.com')) {
        return {
          success: false,
          error: {
            field: 'input',
            message: `The URL domain "${host}" is not an Instagram URL.`,
            suggestion: 'Please provide an Instagram profile link or handle.'
          }
        };
      }

      // Split pathname and remove empty parts
      const pathSegments = parsedUrl.pathname.split('/').filter(p => Boolean(p.trim()));

      if (pathSegments.length === 0) {
        return {
          success: false,
          error: {
            field: 'input',
            message: 'Instagram homepage URL provided without a username.',
            suggestion: 'Example: https://www.instagram.com/nike/'
          }
        };
      }

      const firstSegment = pathSegments[0].toLowerCase();

      // Check for disallowed route types
      if (['p', 'reel', 'reels', 'tv', 'stories', 'explore', 'direct', 'accounts', 'help', 'developer', 'about'].includes(firstSegment)) {
        if (['p', 'reel', 'reels', 'tv'].includes(firstSegment)) {
          return {
            success: false,
            error: {
              field: 'input',
              message: `You entered an Instagram ${firstSegment === 'p' ? 'post' : 'reel'} URL instead of a profile.`,
              suggestion: 'Please enter the creator or business profile handle directly (e.g. @nike).'
            }
          };
        }

        return {
          success: false,
          error: {
            field: 'input',
            message: `"${firstSegment}" is an Instagram system route, not a business profile.`,
            suggestion: 'Please enter a valid business profile username.'
          }
        };
      }

      extractedHandle = pathSegments[0];
    } catch (e: any) {
      return {
        success: false,
        error: {
          field: 'input',
          message: 'The URL provided is malformed and could not be parsed.',
          suggestion: 'Check the URL format or simply enter the username with an @ (e.g. @nike).'
        }
      };
    }
  } else {
    // Plain username format
    // Clean any trailing slash or query
    extractedHandle = cleaned.split('?')[0].split('/')[0];
  }

  // Sanitize handle string
  extractedHandle = extractedHandle.toLowerCase().trim();

  // Validate Instagram handle rules:
  // - 1 to 30 characters
  // - Letters, numbers, periods, underscores
  // - Cannot start or end with a period
  // - No consecutive periods
  if (!extractedHandle) {
    return {
      success: false,
      error: {
        field: 'input',
        message: 'Could not extract a valid username from your input.',
        suggestion: 'Example: @glossier'
      }
    };
  }

  if (extractedHandle.length > 30) {
    return {
      success: false,
      error: {
        field: 'input',
        message: 'Instagram usernames cannot exceed 30 characters in length.',
        suggestion: 'Please verify the username.'
      }
    };
  }

  const validHandleRegex = /^[a-z0-9._]+$/;
  if (!validHandleRegex.test(extractedHandle)) {
    return {
      success: false,
      error: {
        field: 'input',
        message: `Username contains invalid characters: "${extractedHandle}".`,
        suggestion: 'Instagram usernames can only contain letters, numbers, periods, and underscores.'
      }
    };
  }

  if (extractedHandle.startsWith('.') || extractedHandle.endsWith('.')) {
    return {
      success: false,
      error: {
        field: 'input',
        message: 'Instagram usernames cannot start or end with a period.',
        suggestion: 'Remove leading or trailing dots.'
      }
    };
  }

  if (extractedHandle.includes('..')) {
    return {
      success: false,
      error: {
        field: 'input',
        message: 'Instagram usernames cannot contain consecutive periods.',
        suggestion: 'Remove consecutive periods.'
      }
    };
  }

  return {
    success: true,
    data: {
      instagram_handle: extractedHandle,
      instagram_url: `https://www.instagram.com/${extractedHandle}/`
    }
  };
}
