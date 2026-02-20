{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };

        nodeVersionStr = builtins.readFile ./.node-version;
        nodeMajorVersion = builtins.head (builtins.match "v?([0-9]+).*" nodeVersionStr);
        node = pkgs."nodejs_${nodeMajorVersion}";

        # Dependencies required at run-time.
        buildInputs = with pkgs; [
          node
          corepack
          playwright-driver.browsers
        ];

        # Dependencies required at build-time.
        nativeBuildInputs = with pkgs; [ ];
      in
      {
        # Development shell with: nix develop
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [ ] ++ buildInputs ++ nativeBuildInputs;
          shellHook = ''
            export PLAYWRIGHT_BROWSERS_PATH=${pkgs.playwright-driver.browsers}
            export PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=true
          '';
        };
      }
    );
}
