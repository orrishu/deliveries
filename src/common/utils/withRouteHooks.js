import lifecycle from 'recompose/lifecycle'

export const whenRouted = (onUpdate = Function.prototype) =>
  lifecycle({
    componentWillMount() {
      const { match } = this.props
      onUpdate(match)
    },

    componentWillUpdate(nextProps) {
      const { match: prev } = this.props
      const { match: next } = nextProps

      if (next && prev && next.url !== prev.url) {
        onUpdate(next)
      }
    }
  })
