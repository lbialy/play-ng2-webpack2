import scala.language.postfixOps

name := """play-ng2-webpack2"""

version := "0.1-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"

fork in run := true

/*
 * UI Build Scripts
 */

unmanagedResourceDirectories in Assets += (baseDirectory.value / "ui" / "dist")

PlayKeys.playRunHooks <+= baseDirectory.map(UIBuild.apply)

def runNpmInstall(dir: File) = {
  if ((dir / "node_modules").exists()) 0 else Process("npm"::"install"::Nil, dir) !
}

def runBuild(dir: File) = {
  val packagesInstall = runNpmInstall(dir)
  if (packagesInstall == 0) Process("webpack" :: "--progress" :: "--hide-modules" :: Nil, dir, "WEBPACK_ENV" -> "production") !
  else packagesInstall
}

def runKarma(dir: File) = {
  Process("karma" :: "start" :: Nil, dir, "NODE_ENV" -> "true")
}

lazy val `ui-build` = TaskKey[Unit]("Run UI build when packaging the application.")

`ui-build` := {
  val UIroot = baseDirectory.value / "ui"
  if (runBuild(UIroot) != 0) throw new Exception("Oops! UI Build crashed.")
}

lazy val `ui-test` = TaskKey[Unit]("Run UI tests when testing application.")

`ui-test` := {
  val UIroot = baseDirectory.value / "ui"
  if ((runKarma(UIroot)!) != 0) throw new Exception("UI tests failed!")
}

`ui-test` <<= `ui-test` dependsOn `ui-build`

dist <<= dist dependsOn `ui-build`

stage <<= stage dependsOn `ui-build`

test <<= (test in Test) dependsOn `ui-test`