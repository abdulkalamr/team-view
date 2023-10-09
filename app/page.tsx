'use client';
import { makeServer } from "../mirage";
import { useState, ChangeEvent } from "react";
import TeamFilter from "./components/TeamFilter/TeamFilter";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import EmployeeTree from "./components/EmployeeTree/EmployeeTree";
import styles from './page.module.css';

makeServer()

export default function Home() {
  const [team, setTeam] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  function onSearchQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.sidebar}>
        <div className={styles.searchWrapper}>
          <TeamFilter handleValueChange={setTeam} />
          <div className={styles.searchBoxWrapper}>
            <input value={searchQuery} onChange={onSearchQueryChange} className={styles.searchBox} />
          </div>
        </div>

        <section>
          <EmployeeList team={team} searchQuery={searchQuery} />
        </section>
      </div>

      <main className={styles.main}>
        <EmployeeTree team={team} />
      </main>
    </div>
  )
}
