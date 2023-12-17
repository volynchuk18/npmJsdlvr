import { DirectiveBinding } from 'vue';

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.style.maxWidth = binding.value || '15rem';
    el.title = el.textContent || '';
    el.classList.add('ellipsis');
  },
};
