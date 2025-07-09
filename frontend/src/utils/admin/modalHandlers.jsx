// Modal handlers
import { useState } from "react";

const useModalHandlers = () => {
    // Modal states
	const [confirmModal, setConfirmModal] = useState({
		isOpen: false,
		type: "",
		data: null,
	});
	
	const [contentModal, setContentModal] = useState({
		isOpen: false,
		mode: "view",
		content: null,
	});

	const [userModal, setUserModal] = useState({
		isOpen: false,
		mode: "view",
		user: null,
	});

	const openUserModal = (mode, user = null) => {
		setUserModal({
			isOpen: true,
			mode,
			user,
		});
	};

	const openConfirmModal = (type, data) => {
		setConfirmModal({
			isOpen: true,
			type,
			data,
		});
	};

	const closeConfirmModal = () => {
		setConfirmModal({
			isOpen: false,
			type: "",
			data: null,
		});
	};

	const closeUserModal = () => {
		setUserModal({
			isOpen: false,
			mode: "view",
			user: null,
		});
	};

	const openContentModal = (mode, content = null) => {
		setContentModal({
			isOpen: true,
			mode,
			content,
		});
	};

	const closeContentModal = () => {
		setContentModal({
			isOpen: false,
			mode: "view",
			content: null,
		});
	};
	// You should also return the handlers and modal states so they can be used in components
	return {
        confirmModal,
		userModal,
        contentModal,
		setUserModal,
		openUserModal,
		closeUserModal,
		openConfirmModal,
		closeConfirmModal,
		openContentModal,
		closeContentModal
	};
}

export default useModalHandlers;