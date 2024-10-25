export default {
  methods: {
    /**
     * Handle ajax errors.
     * @param error
     * @return string
     */
    handleAjaxError(error: any): string {
      let errorMessage = 'An unexpected error occurred'
      let statusCode = 500

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        statusCode = error.response.status
        errorMessage = error.response.data.message || `Error ${statusCode}`
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server'
        statusCode = 503
      } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message
      }
      console.error('AJAX Error:', error)
      return errorMessage
    },
  }
};
