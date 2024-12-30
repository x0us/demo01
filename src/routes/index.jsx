// import { A } from '@solidjs/router'
import Nav from '~/components/Nav'
import CaseShow from '~/components/Case'
import IndexForm from '~/components/IndexForm'
import SectionIndexTop from '~/components/SectionIndexTop'
import Testimonal from '~/components/Testimonal'
import TopCarousel from '~/components/TopCarousel'
import ChooseUs from '~/components/Us'
import WarehouseShow from '~/components/Warehouse'

export default function Home() {
  return (
    <>
      <Nav />
      <TopCarousel />
      <SectionIndexTop />
      <IndexForm />
      <Testimonal />
      <CaseShow />
      <WarehouseShow />
      <ChooseUs />
    </>
  )
}
