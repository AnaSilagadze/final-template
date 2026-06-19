const localFlowersData = [
    {
        id: 1,
        common_name: " Red Rose",
        cycle: "Perennial",
        default_image: {
            regular_url: "assets/rose.jpg"
        }
    },
    {
        id: 2,
        common_name: "Yellow Tulip",
        cycle: "Perennial",
        default_image: {
            regular_url: "assets/tulip.jpg"
        }
    },
    {
        id: 3,
        common_name: "Sunflower",
        cycle: "Annual",
        default_image: {
            regular_url: "assets/sunflower.jpg"
        }
    },
    {
        id: 4,
        common_name: "Lavender",
        cycle: "Perennial",
        default_image: {
            regular_url: "assets/lavender.jpg"
        }
    },
    {
        id: 5,
        common_name: "White Daisy",
        cycle: "Perennial",
        default_image: {
            regular_url: "assets/daisy.jpg"
        }
    },
    {
        id: 6,
        common_name: "Pink Orchid",
        cycle: "Perennial",
        default_image: {
            regular_url: "assets/orchids.jpg"
        }
    }
];

export async function fetchFlowersData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const simulateError = false; 

            if (simulateError) {
                reject(new Error("Could not connect to the database."));
            } else {
                resolve(localFlowersData);
            }
        }, 1000); 
    });
}