import organizationJson from "../../data/organization.json";

interface LeadershipRole {
  role: string;
  description: (string | null)[];
}

export function Organization() {
  const leadershipRoles = new Array<LeadershipRole>();

  const populateLeadershipRoles = () => {
    for (const role of Object.keys((organizationJson as any).role)) {
      const leadershipRole: LeadershipRole = {
        role,
        description: [],
      };

      for (const people of (organizationJson as any).role[role]) {
        leadershipRole.description.push(people);
      }

      leadershipRoles.push(leadershipRole);
    }
  };

  populateLeadershipRoles();

  return (
    <main>
      <h2>Management Leadership Roles</h2>

      <div id="organization-list">
        {leadershipRoles.map((orgDesc, orgIndex) => (
          <div key={orgIndex}>
            <h3>{orgDesc.role}</h3>
            <ul>
              <li className="leadership">
                {orgDesc.description.map((leadershipDesc, leadershipIndex) => (
                  <div key={leadershipIndex}>{leadershipDesc ?? "Vacant"}</div>
                ))}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}


