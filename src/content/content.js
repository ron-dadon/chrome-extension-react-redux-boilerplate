import { mountWithStore } from 'utils/mounting'
import Counter from 'shared/components/Counter/Counter'

mountWithStore({ Component: Counter, elementStyle: { position: 'fixed', top: 0, left: 0, right: 0, height: '100px' } })
