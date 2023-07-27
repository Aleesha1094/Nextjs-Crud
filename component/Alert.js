function Alert ({ text, setAlert, styles}) {

  const handleAlert = (e) => {
    e.preventDefault();
    setAlert("");
  }
  return (
    <>
      <div className="alert w-50 align-self-center alert-success alert-dismissible fade show" style={{display: styles}}>
        {text}
        <button type="button" className="close" aria-label="Close" onClick={(e) => handleAlert(e)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </>
  );
};

export default Alert;
