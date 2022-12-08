export default function ConfirmationPopup({ setConfirm, numOfPoints }) {
  return (
    <>
      <label htmlFor="my-modal-6" className="btn">
        Add Points
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Add {numOfPoints} points to user
          </h3>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn-primary btn"
              onClick={() => setConfirm(true)}
            >
              Confirm
            </label>
            <label htmlFor="my-modal-6" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
