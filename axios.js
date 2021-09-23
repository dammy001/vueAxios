import axios from 'axios';

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
   axiosProps = {},
  }) {
   // Request Response And Error
   const result = { response: false, error: false };

   // Call Before Function
   before();

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
     result.response = response;

     // Handle Responses
     this.$options.handleHttpResponse({ response, mutate, success });
    })
    .catch((err) => {
     // Assign Response Error
     result.error = err;

     error(err);
    });

   // Call After Function With Response As Parameter
   after(result);

   return result;
  },
  async $get(payload) {
   // Call Ajax Action With GET As Method
   return await this.$ajax({ ...payload, method: 'GET' });
  },
  // Send POST Requests
  async $post(payload) {
   // Call Ajax Action With POST As Method
   return await this.$ajax({ ...payload, method: 'POST' });
  },
  // Send PUT Requests
  async $put(payload) {
   // Call Ajax Action With PUT As Method
   return await this.$ajax({ ...payload, method: 'PUT' });
  },
  // Send DELETE Requests
  async $_delete(payload) {
   // Call Ajax Action With DELETE As Method
   return await this.$ajax({ ...payload, method: 'DELETE' });
  },
  queryParams(key) {
   const queries = this.$route.query;
   if (!key) return queries;

   return queries[key] || false;
  },
 },
 // Handle Response Data
 handleHttpResponse({ response, success }) {
  // No Data Was Returned
  if (!response.data) {
   console.log('No Data Was Returned');
   return;
  }

  if (
   response.data.success === true ||
   response.data.status === true ||
   response.data.data
  ) {
   success(response);
  }
 },
};
