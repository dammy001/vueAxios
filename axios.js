import axios from 'axios'

export default {
	methods: {
    async $ajax({
      method = 'GET',
      url,
      data,
      headers = [],
      mutate = false,
      before = () => {},
      after = () => {},
      success = () => {},
      error = () => {},
      handleError = true,
      serverError = false,
      formErrors = true,
      axiosProps = {},
    }) {
      // Request Response And Error
      const result = { response: false, error: false }

      // Activate Loading Status
      // commit("loading");

      // Call Before Function
      before()

      // Send Request
      await axios({
        // Request URL
        url,
        // Request Method
        method,
        // Post Data
        data,
        // Request Headers
        headers,
        // Axios Specific Properties
        ...axiosProps,
      })
        .then((response) => {
          // Assign Request Response
          result.response = response

          // Handle Responses
          this.$options.handleHttpResponse({ response, mutate, success })
        })
        .catch((err) => {
          // Assign Response Error
          result.error = err

          error(err)

          // Handle Errors
          if (handleError) {
            this.$options.handleHttpError({ ...err, serverError, formErrors })
          }
        })

      // Call After Function With Response As Parameter
      after(result)

      // Deactivate Loading Status
      // commit("loading", false);

      return result
    },
    async $get(payload) {
      // Call Ajax Action With GET As Method
      return await this.$ajax({ ...payload, method: 'GET' })
    },
    // Send POST Requests
    async $post(payload) {
      // Call Ajax Action With POST As Method
      return await this.$ajax({ ...payload, method: 'POST' })
    },
    // Send PUT Requests
    async $put(payload) {
      // Call Ajax Action With PUT As Method
      return await this.$ajax({ ...payload, method: 'PUT' })
    },
    // Send DELETE Requests
    async $_delete(payload) {
      // Call Ajax Action With DELETE As Method
      return await this.$ajax({ ...payload, method: 'DELETE' })
    },
    queryParams(key) {
      const queries = this.$route.query
      if (!key) return queries

      return queries[key] || false
    },
  },
  // Handle Response Data
  handleHttpResponse({ response, success }) {
    // No Data Was Returned
    if (!response.data) {
      console.log('No Data Was Returned')
      // this.warning(
      // 	"There was an error",
      // 	"Please Try Again Later"
      // );
      return
    }

    if (
      response.data.success === true ||
      response.data.status === true ||
      response.data.data
    ) {
      success(response)
    }
  },

  // Handle Response Errors
  handleHttpError({ response, formErrors }) {
    // No Response Was Returned
    if (!response) {
      console.log('No Response Was Returned')
      // this.error(
      // 	"There was an error",
      // 	"Please try again later"
      // );
      return
    }

    // Handle Error States / Codes
    switch (response.status) {
      case 400:
        // Bad Request
        console.log('Bad Request')
        // this.error(
        // 	"There was an error",
        // 	serverError && response.data ? response.data.message : "Please try again later"
        // );
        break
      case 404:
        // Not Found
        console.log('Not Found')
        // this.error(
        // 	"There was an error",
        // 	serverError && response.data ? response.data.message : "Please try again later"
        // );
        break
      case 419:
        // X-CSRF-TOKEN Error
        console.log('X-CSRF-TOKEN Error')
        // this.error(
        // 	"Session Expired",
        // 	serverError && response.data ? response.data.message : "Please reload your browser"
        // );
        break
      case 422:
        if (formErrors) {
          // Input Data Error
          console.log('Input Data Error')
          // this.error(
          // 	"Incorrect Form Data",
          // 	serverError && response.data ? response.data.message : "Please check the form for incorrect data"
          // );
        }
        break
      case 500:
        // Server Error
        console.log('Server Error')
        // this.error(
        // 	"Sorry",
        // 	serverError && response.data ? response.data.message : "We are currently working on it"
        // );
        break
      case 504:
        // Gateway Timeout
        console.log('Gateway Timeout')
        // this.error(
        // 	"Request Timed Out",
        // 	serverError && response.data ? response.data.message : "The request took too long, please try again"
        // );
        break

      // ================================================================================
      // ================================================================================
      // Custom Error Codes
      // ================================================================================
      // ================================================================================
      case 449:
        // Just Try Again
        console.log('Just Try Again')
        // this.error(
        // 	"Please Try Again",
        // 	serverError && response.data ? response.data.message : "Please just try again"
        // );
        break
      default:
        // Unknown Error
        console.log('Unknown Error')
        // this.error(
        // 	"Sorry",
        // 	serverError && response.data ? response.data.message : "We are currently working on it"
        // );
        break
    }
  },
}