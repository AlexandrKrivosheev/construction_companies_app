import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Companies } from "./Companies";
import { ApiContext } from "./ApiContext";

const companies = [
  {
    id: "1",
    name: "company_1",
    logo: { link: "https://placekitten.com/50/50" },
    specialties: ["excavation", "plumbing", "electrical"],
    city: "berlin",
  },
  {
    id: "2",
    name: "company_2",
    logo: { link: "https://placekitten.com/50/50" },
    specialties: ["excavation"],
    city: "bremen",
  },
  {
    id: "3",
    name: "company_3",
    logo: { link: "https://placekitten.com/50/50" },
    specialties: ["plumbing"],
    city: "nuremberg",
  },
];

const ApiProvider = ({ children }) => (
  <ApiContext.Provider
    value={{
      fetchCompanies: () =>
        Promise.resolve({ json: () => Promise.resolve(companies) }),
    }}
  >
    {children}
  </ApiContext.Provider>
);

test("filters by company name", async () => {
  render(<Companies />, { wrapper: ApiProvider });

  await waitFor(() => {
    for (const c of companies) {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    }
  });

  fireEvent.change(screen.getByLabelText(/company name/i), {
    target: { value: "1" },
  });

  expect(screen.getByText(companies[0].name)).toBeInTheDocument();
  expect(screen.queryByText(companies[1].name)).not.toBeInTheDocument();
  expect(screen.queryByText(companies[2].name)).not.toBeInTheDocument();
});

test("filters by specialties (should include all selected)", async () => {
  render(<Companies />, { wrapper: ApiProvider });

  await waitFor(async () => {
    for (const c of companies) {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    }
  });

  fireEvent.click(screen.getByLabelText(/plumbing/i));
  fireEvent.click(screen.getByLabelText(/excavation/i));

  expect(screen.getByText(companies[0].name)).toBeInTheDocument();
  expect(screen.queryByText(companies[1].name)).not.toBeInTheDocument();
  expect(screen.queryByText(companies[2].name)).not.toBeInTheDocument();
});
