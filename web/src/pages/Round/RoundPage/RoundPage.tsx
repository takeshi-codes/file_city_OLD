import RoundCell from 'src/components/Round/RoundCell'

type RoundPageProps = {
  id: string
}

const RoundPage = ({ id }: RoundPageProps) => {
  return <RoundCell id={id} />
}

export default RoundPage
