import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

const DialogBox=({handledeleteAll})=> {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        handledeleteAll();
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'All notes deleted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'Cancle delete', life: 3000 });
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog group="declarative"  visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?" 
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
            <div className="card flex justify-content-center">
                <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Delete ALL " />
            </div>
        </>
    )
    ;
}

export default DialogBox;