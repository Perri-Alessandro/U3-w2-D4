import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "../App";
import TVShows from "../components/TVShows";

describe("general mounting", () => {
  it("correctly mounts the Welcome Component", () => {
    render(<App />);

    const welcome = screen.getByText(/Hey, nice to see you/i);
    expect(welcome).toBeInTheDocument();
  });

  test("cards not rendered from json", async () => {
    render(<App />);

    await waitFor(() => {
      const cards = screen.queryAllByTestId("cards");
      expect(cards).toHaveLength(0);
    });
  });

  it("correctly mounts the MyNav", () => {
    render(<App />);

    const myNav = screen.getByText(/my list/i);
    expect(myNav).toBeInTheDocument();
  });

  // it("correctly rendered all cards from json", async () => {
  //   render(<App />);

  //   const cards = await screen.findByTestId("cards");
  //   expect(cards).toBeInTheDocument();
  // });

  test("correctly hidden welcome component", () => {
    render(<App />);

    const alert = screen.getByText(/Hey, nice to see you/i);
    expect(alert).toBeInTheDocument();

    const closeText = screen.getByText(/Click here to hide the alert/i);

    fireEvent.click(closeText);

    expect(alert).not.toBeInTheDocument();
  });
});

describe("MovieDetails mounting", () => {
  it("rendered moviedetails author", () => {
    render(<App />);

    const card = screen.getAllByTestId("cards");
    const moviedetailsPage = screen.getByTestId("moviedetails-page");

    fireEvent.click(card[0]);
    expect(moviedetailsPage).toBeInTheDocument();
  });

  it("rendered actors", () => {
    render(<App />);

    const actors = screen.getByText(/Actors/i);

    expect(actors).toBeInTheDocument();
  });
});
