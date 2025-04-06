/**
 * Utility function to handle API errors
 */
export const handleApiError = (error: any): string => {
  if (!error) {
    return 'An unknown error occurred';
  }

  // Network error
  if (error.message === 'Network Error' || !navigator.onLine) {
    return 'Network error. Please check your connection.';
  }

  // Error from API with response
  if (error.response) {
    const { status } = error.response;
    
    // Handle different status codes
    switch (status) {
      case 400:
        return 'Invalid request. Please check your data.';
      case 401:
        return 'Authentication required. Please log in again.';
      case 403:
        return 'You do not have permission to access this resource.';
      case 404:
        return 'The requested resource was not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Error: ${status} - ${error.response.data?.message || 'Something went wrong'}`;
    }
  }

  // Error with request
  if (error.request) {
    return 'No response received from server. Please try again.';
  }

  // Other errors
  return error.message || 'An unexpected error occurred';
};

/**
 * Safely parse JSON with error handling
 */
export const safeJsonParse = (data: string): any => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    throw new Error('Invalid data format received from server');
  }
};

/**
 * Wrapper for fetch with timeout and error handling
 */
export const fetchWithTimeout = async (
  url: string, 
  options: RequestInit = {}, 
  timeout = 10000
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
    }
    
    throw error;
  }
};