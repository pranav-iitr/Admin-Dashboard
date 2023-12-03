import React, { useState, useEffect } from "react";
import { getData } from "../hooks/data";
import { paginate } from "../utils/paginate";
import { trigramSearch } from "../utils/search";
import { set } from "lodash";
function Index() {
  const [data, setData] = useState<any>([]);
  const [selected, setSelected] = useState(0);
  const [Display, setDisplay] = useState([]);
  const [search, setSearch] = useState("");
  const [sD, setSD] = useState([]);
  const [SlectedArray, setSlectedArray] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const { mutate, isLoading, isError } = getData(
    (Data: any) => {
      setData(paginate(Data.data, 10));
      setSD(Data.data);
    },
    (err: any) => console.log(err)
  );
  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    setDisplay(data[selected]);
    console.log(data);
    setSlectedArray(
      data.length > 0 && data[selected]
        ? data[selected].map((i: any) => false)
        : []
    );
  }, [data, selected]);

  useEffect(() => {
    if (search.length > 3) {
      const newData = paginate(trigramSearch(search, sD), 10);
      setData(newData);
    } else {
      setData(paginate(sD, 10));
    }
  }, [search]);

  return (
    <div className="flex flex-col items-center gap-5 mt-16">
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="flex justify-between w-[40%]">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              style={{ width: "40%" }}
              placeholder="search"
            />{" "}
            <button
              className="border-2 bg-red-400 rounded-md p-2"
              onClick={() => {
                const newData = [];
                const selData = [];
                Display.map((item: any, id) => {
                  if (!SlectedArray[id]) {
                    console.log("item", item, SlectedArray[id]);
                    newData.push(item);
                    selData.push(false);
                  }
                });
                setSlectedArray(selData);
                setDisplay(newData);
              }}
            >
              delete
            </button>
          </div>
          {/* table to display selected name email role and action  */}
          <table style={{ width: "46%" }}>
            <thead>
              <tr>
                <th>
                  <input
                    onChange={() => {
                      // get product of all the values in the array in avarible
                      const prod = SlectedArray.reduce(
                        (a: any, b: any) => a && b
                      );
                      console.log("prod", prod);

                      // console.log("intialState", intialState);
                      const newData = SlectedArray.map((i: any) => !prod);
                      console.log("newData", newData);
                      setSlectedArray(newData);
                    }}
                    checked={
                      SlectedArray.length > 0
                        ? SlectedArray.reduce((a: any, b: any) => a && b)
                        : false
                    }
                    type="checkbox"
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Display &&
                Display?.map((item: any, id) => (
                  <tr key={item.id}>
                    <th>
                      <input
                        checked={SlectedArray[id]}
                        onChange={() => {
                          const newData = SlectedArray.map(
                            (i: any, index: any) => {
                              if (index == id) {
                                return !i;
                              } else {
                                return i;
                              }
                            }
                          );
                          setSlectedArray(newData);
                        }}
                        type="checkbox"
                      />
                    </th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginLeft: "20%",
                      }}
                    >
                      <button
                        className="border-2 border-red-400 rounded-md p-2"
                        onClick={() => {}}
                      >
                        Edit
                      </button>
                      <button
                        className="border-2 border-red-400 rounded-md p-2"
                        onClick={() => {
                          const newData = Display.filter(
                            (i: any) => i.id != item.id
                          );
                          const nd = SlectedArray.filter(
                            (i: any, itd) => itd != id
                          );
                          setSlectedArray(nd);
                          setDisplay(newData);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* pagination */}
          <div>
            <button
              disabled={selected == 0}
              onClick={() => setSelected(selected - 1)}
            >
              Previous
            </button>
            {` page ${selected + 1} out of ${data.length} `}
            <button
              disabled={selected == data.length - 1}
              onClick={() => setSelected(selected + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
