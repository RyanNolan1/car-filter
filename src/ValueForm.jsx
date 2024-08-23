export default function ValueForm() {
    return (
      <div className="value-form-container">
        <div className="value-form-top-container">
          <h1>Value your car</h1>
          <p>Find out the value of your car in just a few minutes</p>
        </div>
        <form className="value-form">
          <label class="form-label">
            <p className="input-title">VRM<span class="asterisk">*</span></p>
            <input maxlength="10" className="form-input" type="text" name="VRM" placeholder="Enter VRM" />
          </label>
          <label class="form-label">
            <p className="input-title">Mileage<span>*</span></p>
            <input className="form-input" type="number" name="Mileage" placeholder="Enter mileage" />
          </label>
          <input
            className="value-form-submit"
            type="submit"
            value="Value my car"
          />
        </form>
      </div>
    );
  }