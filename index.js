import VueAxios from './axios'

const Mixin = {
	install(Vue, options = {}) {
		Vue.mixin(VueAxios)
	}
}

export default Mixin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Mixin)
}