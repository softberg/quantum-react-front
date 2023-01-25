import { Modal, Button } from 'react-materialize'
import { useTranslation } from 'react-i18next';
import { postApi } from '../../api/postApi';

const DeleteModal = ({ url, id, setState, item }) => {
	const { t } = useTranslation()
	const onDeleteHandler = () => {
		postApi.deletePostOrImage(url, id)
			.then(res => {
				if (res.data.status === 'success') {
					setState(id)
				}
			})
	}
	return <>
		<Modal
			actions={[
				<Button flat modal="close" node="button" waves="green">{t('cancel')}</Button>,
				<Button
					className="red lighten-2"
					node="button"
					waves="green"
					modal="close"
					onClick={onDeleteHandler}
				>{t('yes')}</Button>
			]}
			bottomSheet={false}
			fixedFooter={false}
			id="modal1"
			open={false}
			options={{
				dismissible: true,
				endingTop: '10%',
				inDuration: 250,
				onCloseEnd: null,
				onCloseStart: null,
				onOpenEnd: null,
				onOpenStart: null,
				opacity: 0.5,
				outDuration: 250,
				preventScrolling: true,
				startingTop: '4%'
			}}
		>
			<p>{t('confirm_delete', { item })}</p>
		</Modal>
	</>
}

export default DeleteModal