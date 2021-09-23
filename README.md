# vue-axios

# Axios wrapper for Vue 2.x

### Install

#### NPM

```
npm i axios @damilaredev/vue-axios --save
```

### Usage

```
import Vue from 'vue';
import VueAxios from '@damilaredev/vue-axios';

Vue.use(VueAxios);
```

#### Via NPM

###### component.vue sample

```vue
<script>
 export default {
  computed: {
   headers() {
    return {
     Authorization: `************************`,
    };
   },
  },
  methods: {
   getItem: function () {
    this.$get({
     url: `your-url`,
     headers: this.headers,
     success: (response) => console.log(response),
     error: (error) => console.log(error),
    });
   },
   submitItem: function () {
    this.$post({
     url: `your-url`,
     headers: this.headers,
     data: { ...data },
     success: (response) => console.log(response),
     error: (error) => console.log(error),
    });
   },
   deleteItem: function (id) {
    this.$_delete({
     url: `your-url/${id}`,
     success: (response) => console.log(response),
     error: (error) => console.log(error),
    });
   },
  },
 };
</script>
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Some commit message'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 😉😉

## How can I thank you?

Why not star the github repo? I'd love the attention! Why not share the link for this repository on Twitter or Any Social Media? Spread the word!

Don't forget to [follow me on twitter](https://twitter.com/laravel00)!

Thanks!
Damilare.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
