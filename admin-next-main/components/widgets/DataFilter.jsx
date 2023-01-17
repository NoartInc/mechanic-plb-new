import { IconCheck, IconFilter } from '@tabler/icons'
import React from 'react'
import Modal from './Modal';

const DataFilter = ({ children, onApply = null }) => {
    const [showFilter, setShowFilter] = React.useState(false);

    const onApplyFilter = () => {
        setShowFilter(false);
        onApply();
    }

    const ApplyButton = () => (
        <div className="flex-shrink-0 mt-3 md:mt-0">
            <button className="button button-primary" onClick={onApplyFilter}>
                <IconCheck />
                <span>Apply Filter</span>
            </button>
        </div>
    );

    return (
        <div>
            <button type="button" className="button button-primary" onClick={() => setShowFilter(true)}>
                <IconFilter />
            </button>
            <Modal title="Data Filter" onClose={() => setShowFilter(false)} show={showFilter} action={<ApplyButton />}>
                {children}
            </Modal>
        </div>
    )
}

export default DataFilter