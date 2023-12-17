import textEllipsis from 'src/directives/text-ellipsis';
import { boot } from 'quasar/wrappers';
export default boot(({ app }) => {
  app.directive('text-ellipsis', textEllipsis)
})
