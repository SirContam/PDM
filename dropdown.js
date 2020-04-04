import React from "react";
// The data.json file (just grab the data from your database table and name it 'data')
import data from "./data.json";
// The image for the car (you can change the image to whichever image you have for the car)
// And if you want you can grab the image from your database and just add this line to the state:
// img: null,
// and then in the label for the individual car name onClick, where there is a setState() function,
// add inside of it this line of code,
// img: item.img_path
// replacing .img_path with whatever your rows in your database are named
import img from "./car.png";

let car = [];
data.rows.forEach(element => {
  car.push(element);
});

// Grab every single category from the list of cars in the JSON file
let carCategories = [];
data.rows.forEach(element => {
  carCategories.push(element.category);
});

// Remove the duplicate categories in carCategories
let uniqueCategories = carCategories.filter(function(item, pos) {
  return carCategories.indexOf(item) === pos;
});

// The Dropdown Component
class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    /* The different states that this dropdown can have:
        toggle: Toggles the visibility of the dropdown menu
        boxToggle: Toggles the visibility of the overlay and the box
        name: Show's the clicked on item's name in the box 
        price: Show's the clicked on item's price in the box */

    this.state = {
      toggle: false,
      boxToggle: false,
      name: null,
      price: null
    };
  }

  render() {
    // The class name "show" when toggle is true and "hide" when toggle is false
    const visible = this.state.toggle ? "show" : "hide";
    // The class name "show" when boxToggle is true and "hide" when boxToggle is false
    const boxVisible = this.state.boxToggle ? "show" : "hide";
    // The HTML (or JSX) of the Dropdown Component
    return (
      <div>
        {/* Overlay */}
        <div
          // Give the overlay the boxVisible class which is either 'show' or 'hide'
          className={`overlay ${boxVisible}`}
          // Clicking on the overlay turns off the overlay
          onClick={() => this.setState({ boxToggle: !this.state.boxToggle })}
        >
          {/* e.stopPropagation() doesn't allow clicking inside the box to turn off the overlay */}
          <div className={`overlay-box`} onClick={e => e.stopPropagation()}>
            <div className="container">
              <div className="img-container">
                <img src={img} alt="" className="car-img" />
              </div>
              <div className="text-container">
                <div className="car-name-label">Car Name:</div>
                <div className="car-name">{this.state.name}</div>
                <div className="car-price-label">Car Price:</div>
                <div className="car-price">{this.state.price}</div>
                <div className="btn">
                  <a>View Inventory</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Button to toggle dropdown menu */}
        <a
          className="btn"
          // Switch the value of toggle when the button is pressed
          onClick={() => this.setState({ toggle: !this.state.toggle })}
        >
          View Cars
        </a>
        {/* Dropdown menu */}
        {/* Give the dropdown the visible class which is either 'show' or 'hide' */}
        <ul className={`dropdown-menu ${visible}`}>
          {/* Go through every car category and create another drop-down menu */}
          {uniqueCategories.map((value, f_index) => {
            return (
              <div key={f_index}>
                <li>
                  {/* The label for the dropdown menu for each car-category */}
                  <a>{value}</a>
                  {/* The dropdown menu for each car-category */}
                  <ul className="dropdown-submenu" key={f_index}>
                    {/* Go through every car and create a label for each of them */}
                    {car
                      .filter(function(item) {
                        return item.category === value;
                      })
                      .map((item, s_index) => {
                        return (
                          // The label for each individual car name
                          <li key={s_index}>
                            <a
                              onClick={() =>
                                // When clicking on the label, turn the overlay on and update the name and price
                                this.setState({
                                  boxToggle: !this.state.boxToggle,
                                  name: item.name,
                                  price: item.price
                                })
                              }
                            >
                              {/* What is shown inside of the label (right now it's the car name) */}
                              {item.name}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

// Export the Dropdown component into your other files.
export default Dropdown;
