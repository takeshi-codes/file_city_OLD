import EditRoundCell from 'src/components/Round/EditRoundCell'

type RoundPageProps = {
  id: string
}

const EditRoundPage = ({ id }: RoundPageProps) => {
  return <EditRoundCell id={id} />
}

export default EditRoundPage
